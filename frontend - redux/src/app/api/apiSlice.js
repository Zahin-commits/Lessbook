import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials ,logOut} from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
 baseUrl:'http://localhost:3000',
 credentials: "include",
 prepareHeaders:(headers, {getState})=>{
 const token = getState().auth.token;
 if(token){
    headers.set("Authorization", `Bearer ${token}`);
 }
 return headers
 }
})

const baseQueryWithReauth = async(args,api,extraOptions)=>{
 let result = await baseQuery(args,api,extraOptions);

 if(result?.error?.originalStatus == 401){
   console.log('you are not authorized');
 }
}