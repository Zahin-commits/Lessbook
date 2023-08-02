import { apiSlice } from "./apiSlice";


export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        getUserData: builder.mutation({
            query: () => ({
                url: `/`,
                method: 'GET',
                credentials:"include"
              }),
        }),
        register:builder.mutation({
            query:(data)=>({
                url: `/auth/register`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),
        
        login:builder.mutation({
            query:(data)=>({
                url: `/auth/login`,
                body: data,
                method: 'POST',
                credentials:"include"  
            })
        }),

        
    })
})

export const {useGetUserDataMutation, useRegisterMutation, useLoginMutation} = userApiSlice;