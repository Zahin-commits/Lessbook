import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:'http://localhost:3000'});
// const baseQuery = fetchBaseQuery({baseUrl:'https://lessbook-api.onrender.com'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Post','comment','story','user'],
  endpoints:(builder)=>({})
}) 

// export const {useGetUserDataMutation} = apiSlice;
//export const {useGetUserDataQuery} = apiSlice;

/* (builder)=>({
        getUserData: builder.mutation({
            query: () => ({
                url: `/`,
                method: 'GET',
                credentials:"include"
              }),
        }),
    }) */
