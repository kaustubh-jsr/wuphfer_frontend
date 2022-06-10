import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { feedReducer } from "./slices/feedSlice";
import { themeReducer } from "./slices/themeSlice";
// 1.State (Global Store)
// // configureStore({reducer:{auth:authSlice.reducer,themeReducer:themeSlice.reducer}})
// // the above creates a store with the given reducer object config, it takes in a configuration object
// // containing the reducer key, which can be a single reducer or an object with multiple reducers for
// // multiple state Slices.

// 2.Slices (Reducer function)
// // const authSlice = createSlice({name:'auth',intialState:authInitialState,reducers:{login(state,action){},logout(state){}}})
// // This creates a slice of the global state, responsible for auth in our app, this slice's reducer needs to be
// // registered with store, so that store knows to store authSlice in it

// 3.Dispatch (State updater functions that are called by app)

// 4.Actions (called in dispatch, provided by slices, instead of defining manually by us during call, we defined
// reducers which map to different action types)
// authSlice.actions.login,authSlice.actions.logout etc, sliceName.acitons.{type of action/ reducer name in slice}
// Theses return action objects with type properties which can be added to a dispatch , which calls the appropiate reducer

// export const authActions = authSlice.actions which is imported in any file
// then dispatch(authActions.login(payload_data)) --> dispatch(login action dispatched) --> reducer called --> state updated
// {type:login,payload:payload_data}

// 5.Subscription (How do react components know of the state)

// const authInitialState = {token:localStorage.getItem('token')}
// const authSlice = createSlice({
//     name:'auth',
//     initialState:authInitialState,
//     reducers:{
//         login ()
//     }
// })
export const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer, feed: feedReducer },
});
