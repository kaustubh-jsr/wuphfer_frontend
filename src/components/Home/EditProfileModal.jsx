import { CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiCamera } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadMedia } from "../../api";
import { updateUserProfile as updateUserProfileApi } from "../../api/homePage";
import { CloseButtonIcon } from "../Buttons";

const EditProfileModal = ({
  showEditModal,
  setShowEditModal,
  user,
  setProfileUser,
}) => {
  const { token } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(user.profile_image);
  const [coverImage, setCoverImage] = useState(user.cover_image);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [loading, setLoading] = useState(false);
  const avatarPickerRef = useRef();
  const coverPickerRef = useRef();
  const navigate = useNavigate();
  const saveProfileHandler = async () => {
    // api call to save
    setLoading(true);
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName ? lastName : "");
    formData.append("profile_image", profileImage);
    formData.append("cover_image", coverImage);
    formData.append("bio", bio);
    formData.append("website", website);
    const submitProfileForm = async (formData) => {
      const resp = await updateUserProfileApi(token, formData);
      if (resp?.status === "ok") {
        toast.success(resp.message);
      } else {
        toast.error(resp.message);
      }
    };
    await submitProfileForm(formData);
    setLoading(false);
    setShowEditModal(false);
    setProfileUser((prev) => ({
      ...prev,
      first_name: firstName,
      last_name: lastName,
      full_name: firstName + " " + (lastName ? lastName : ""),
      profile_image: profileImage,
      cover_image: coverImage,
      bio: bio,
      website: website,
    }));
    navigate(`/${user.username}`);
  };

  const closeModalWithoutSaving = () => {
    setProfileImage(user.profile_image);
    setCoverImage(user.cover_image);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setBio(user.bio);
    setWebsite(user.website);
    setShowEditModal(false);
  };

  const uploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatar = await uploadMedia({
        type: "image",
        file,
        preset: "dl5pn1is",
      });
      setProfileImage(avatar);
    }
  };

  const uploadCoverImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const cover = await uploadMedia({
        type: "image",
        file,
        preset: "u07iybqx",
      });
      setCoverImage(cover);
    }
  };
  return (
    <>
      <div
        className={`${
          showEditModal ? "flex" : "hidden"
        } z-50 fixed w-full flex justify-center inset-0`}
      >
        <div
          onClick={closeModalWithoutSaving}
          className={`w-full h-full bg-gray-900 opacity-50 z-0 ${
            showEditModal ? "absolute" : "hidden"
          } inset-0`}
        />
        <div className="mx-auto">
          <div className="flex items-center justify-center h-full w-full">
            <div className="bg-white dark:bg-secondary-dark-bg rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div className="bg-gray-100 dark:bg-secondary-dark-bg rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p className="text-base font-semibold">Edit Profile</p>
                <button
                  onClick={closeModalWithoutSaving}
                  className="focus:outline-none"
                >
                  <CloseButtonIcon />
                </button>
              </div>
              <div className="flex-col md:pb-4 pb-7 max-h-[36rem] overflow-auto">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col w-full">
                    {/* cover image */}
                    <div className="w-full relative">
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-48 object-cover"
                      />
                      <div
                        className="icon absolute right-2 top-2 bg-gray-400 opacity-75"
                        onClick={() => coverPickerRef.current.click()}
                      >
                        <HiCamera className="h-24" />
                        <input
                          onChange={uploadCoverImage}
                          type="file"
                          accept="img/*"
                          ref={coverPickerRef}
                          hidden
                        />
                      </div>
                    </div>
                    {/* profile pic (absolute ?)  name, handle edit profile bio date etc.*/}

                    {/* avatar and edit profile button at the two extremes */}
                    <div className="flex relative mb-32">
                      <div>
                        <img
                          src={profileImage}
                          alt="Avatar"
                          className="absolute top-[-64px] left-2 h-36 w-36 rounded-full object-cover border-4 border-white"
                        />
                      </div>
                      <div
                        className="icon absolute left-16 top-1 bg-gray-400 opacity-75"
                        onClick={() => avatarPickerRef.current.click()}
                      >
                        <HiCamera className="h-24" />
                        <input
                          onChange={uploadProfileImage}
                          type="file"
                          accept="img/*"
                          ref={avatarPickerRef}
                          hidden
                        />
                      </div>
                    </div>
                    <form className="flex flex-col gap-2 px-4">
                      <input
                        type="text"
                        className="border-2 py-2 px-1 focus:border-sky-400 rounded-lg bg-transparent"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="border-2 py-2 px-1 focus:border-sky-400 rounded-lg bg-transparent"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <textarea
                        className="border-2 py-2 px-1 focus:border-sky-400 rounded-lg h-24 bg-transparent"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <input
                        type="text"
                        className="border-2 py-2 px-1 focus:border-sky-400 rounded-lg bg-transparent"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </form>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-9 px-2">
                  <button
                    onClick={saveProfileHandler}
                    className="w-24 py-2 px-4 border-2 rounded-full font-bold dark:bg-main-dark-bg hover:bg-slate-200 dark:hover:bg-slate-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "black" }} size={18} />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
