import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import { apiSlice } from '../features/user/apiSlice';
import { PostsQuerySlice } from '../features/posts/postsQuerySlice'; 

const store = configureStore({
   reducer:{
      auth:authReducer,
      [apiSlice.reducerPath]:apiSlice.reducer,
  //    [PostsQuerySlice.reducerPath]:PostsQuerySlice.reducer
   },
   middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
   devTools:true
  });

   export default store;