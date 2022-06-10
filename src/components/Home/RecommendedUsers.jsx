import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getRecommendedUsers as getRecommendedUsersApi } from "../../api/homePage";
import OtherUserWidget from "./OtherUserWidget";

const RecommendedUsers = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const location = useLocation();

  const getRecommendedUsers = useCallback(async () => {
    setLoading(true);
    // make api call
    const resp = await getRecommendedUsersApi(token);
    setRecommendedUsers(
      resp.recommended_users.filter(
        (user) => user.username !== location.pathname.slice(1)
      )
    );
    setInitialRender(false);
    setLoading(false);
  }, [token, location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      getRecommendedUsers();
    }
  }, [getRecommendedUsers, location.pathname, isAuthenticated]);

  return (
    <div className="hidden lg:flex justify-center relative w-1/4">
      <div className="flex fixed flex-col flex-grow mx-4 self-start gap-1 py-2 bg-gray-100 dark:bg-secondary-dark-bg rounded-xl mt-4">
        <h2 className="font-extrabold text-xl px-2">Who to follow</h2>
        {recommendedUsers.length !== 0 ? (
          <div className="flex flex-col min-h-24">
            {loading && initialRender ? (
              <CircularProgress className="self-center" />
            ) : (
              <>
                {recommendedUsers.map((user) => (
                  <OtherUserWidget key={user.username} otherUser={user} />
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="flex w-full text-xs justify-center px-20">
            No more users to show
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedUsers;
