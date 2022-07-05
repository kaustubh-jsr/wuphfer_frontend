import React, { useRef, useState } from "react";
import {
  HiX,
  HiOutlinePhotograph,
  HiEmojiHappy,
  HiOutlineCalendar,
} from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import useClickOutside from "../../hooks/useClickOutside";
import { uploadMedia } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../../redux/asyncActions/feedActions";
import { addComment as addCommentApi } from "../../api/homePage";
import toast from "react-hot-toast";

const WoofInput = ({
  isComment,
  user,
  currentPostContent,
  setCurrentPostContent,
  setComments,
  parentPostId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();
  const emojiPickerRef = useRef();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const onEmojiClick = (e, emojiObject) => {
    setCurrentPostContent((prev) => prev + emojiObject.emoji);
    setChosenEmoji(emojiObject);
  };

  // This callback function closes the emojipicker when clicked outside of it
  const onOutsideEmojiClick = () => {
    setShowEmojis(false);
  };

  // This custom hook calls the 2 arg which is the callback, when something outside the element (passed as first arg)
  // is clicked. Basically detects click outside an element, and runs a callback on outside click.
  useClickOutside(emojiPickerRef, onOutsideEmojiClick);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    setLoading(true);
    if (isComment) {
      // make api call, and after success setComments.
      const { message, new_comment } = await addCommentApi(
        token,
        parentPostId,
        currentPostContent
      );
      // const newComment = {
      //   // user_profile_image
      //   // user_full_name
      //   // post_username
      //   // user_username
      //   user: {
      //     profile_image:
      //       "https://res.cloudinary.com/kaustubh-apps/image/upload/v1655066288/e8x4hpsttdwlbuhl7y4j.jpg",
      //     first_name: "Michael",
      //     last_name: "Scottt",
      //     username: "prison_mike",
      //   },
      //   post: {
      //     user: {
      //       username: "michael_scots",
      //     },
      //   },
      //   text: currentPostContent,
      //   likes: 0,
      // };
      setComments((prev) => [...prev, new_comment]);

      toast.success(message, {
        position: "bottom-center",
        duration: 5000,
        style: {
          color: "white",
          backgroundColor: "rgb(14, 165, 233)",
        },
      });
    } else {
      let post_image;
      // create a post object with proper api keys and
      // then setPosts with this obj
      // setPosts((prev) => [currentPost, ...prev]);
      // user --> {first_name,last_name,username,avatar}
      // content --> post content if any else ""
      // image --> image url if any else ""
      // is_media --> true if image_url != ""
      // timestamp --> timestamp from backend
      if (selectedFile) {
        post_image = await uploadMedia({
          type: "image",
          file: selectedFile,
          preset: "u07iybqx",
        });
      }
      const newPost = {
        user: {
          ...user,
        },
        content: currentPostContent,
        image: post_image,
        is_media: post_image ? true : false,
        timestamp: "just now",
      };
      // create an async thunk dispatch here for postAdded
      dispatch(postAdded(token, newPost));
    }
    setSelectedFile(null);
    setCurrentPostContent("");
    setLoading(false);
  };
  // const [currentColor, setCurrentColor] = useState("red-600");
  return (
    <div
      className={`flex border-b border-light-border dark:border-dark-border p-3 gap-x-3 ${
        loading && "opacity-60"
      }`}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={user.profile_image}
        alt={user.full_name}
      />
      <div className="flex-col w-full divide-y divide-light-border dark:divide-dark-border">
        <div>
          <textarea
            disabled={loading}
            value={currentPostContent}
            onChange={(e) => setCurrentPostContent(e.target.value)}
            rows="3"
            placeholder={isComment ? "Woof your reply" : "What's happening ?"}
            className="bg-transparent outline-none text-lg placeholder-slate-500 tracking-wide w-full min-h-[50px]"
          />
          {selectedFile && (
            <div className="relative max-h-96">
              <div
                onClick={() => setSelectedFile(null)}
                className="absolute w-8 h-8 bg-slate-100 opacity-60 flex items-center justify-center top-1 left-1 hover:bg-slate-300 dark:hover:bg-hover-dark-bg transition duration-200 cursor-pointer rounded-full"
              >
                <HiX className="text-black" />
              </div>
              <img
                src={selectedFile}
                alt="File Upload"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex justify-between items-center pt-3">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <HiOutlinePhotograph className="h-24 text-sky-500" />
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </div>
              {/* <div className="icon rotate-90">
              <HiChartBar className="h-24 text-red-600" />
            </div> */}
              <div className="icon">
                <HiOutlineCalendar className="h-24 text-sky-500" />
              </div>
              <div className="icon relative">
                <HiEmojiHappy
                  className="h-24 text-sky-500"
                  onClick={() => setShowEmojis((prev) => !prev)}
                />
                {showEmojis && (
                  <div className="absolute top-8" ref={emojiPickerRef}>
                    <EmojiPicker onEmojiClick={onEmojiClick} preload={true} />
                  </div>
                )}
              </div>
            </div>
            <button
              disabled={
                (!currentPostContent.trim() && !selectedFile) ||
                currentPostContent.trim().length > 280
              }
              className="disabled:cursor-not-allowed disabled:bg-sky-400 disabled:opacity-50 flex w-24 rounded-full justify-center itms-center py-1 bg-sky-500 hover:bg-sky-600 transition duration-200 ease-out text-white font-bold"
              onClick={sendPost}
            >
              Woof
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { WoofInput };
