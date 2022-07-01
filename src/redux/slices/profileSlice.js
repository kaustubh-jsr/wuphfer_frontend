import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "user_details",
  posts: [],
  likes: [],
  media: [],
};

// do u update the likes [] when user likes a post? No --> coz it is rare that he will immediately go
// to his profile and checkout the likes tab
// instead u handle this tab similar to feed, store the feed in redux store, and update/set it on every render
// in the background.
// doing the feed like state is not a good idea, bcoz when you visit profile of user1 u store it in state in redux, then
// go to profile of user2 here all user1 state will show up, if you do not fetch from db on render.
// and if you are going to fetch data from db on render might as well not store it in state,
// only thing that seems possible as of now is you have a state in profile {user, tweets, media, likes}
// initially only tweets are fetched, if media or likes are accessed, they are fetched and stored in useState
// in profile component,also when tabs change you refetch the state(only of that particular tab) in background
//  and update it on successfull response. this can also be achieved by redux, where the previous problem of user1 data on user2
// rofile goes away if we reset the profile state on unmount,in useEffect
const profileSlice = createSlice({
  name: "profile",
});
