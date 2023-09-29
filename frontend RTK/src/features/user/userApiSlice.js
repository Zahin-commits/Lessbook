import { apiSlice } from "./apiSlice";


export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
         getAllPost: builder.query({
             // query: () => '/post',
              query: () => ( { url: `/post`, credentials: "include" }) ,
              providesTags: ['Post'],
          }) ,
         getAllPostByUserId: builder.query({
             // query: () => '/post',
              query: (userId) => ( { url: `/post?userId=${userId}`, credentials: "include" }) ,
              providesTags: ['Post'],
          }) ,

        getPostsData: builder.mutation({
            query: () => ({
                url: '/post',
                method: 'GET',
                credentials:"include"
              }),
              providesTags: ['Post'],
        }),   
        
        createPost: builder.mutation({
            query:(data)=>({
             url: '/post',
             method:"POST",
             body:data,
             credentials:"include"
            }),
            invalidatesTags:["Post"]
        }),

        getUserData: builder.query({
            query: (username) => ({
                url: `/profile/username?=${username}`,
                credentials:"include"
              }),
        }),
        getAuthorData: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                credentials:"include"
              }),
        }),
        getAuthorInfo: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}`,
                method:'GET',
                credentials:"include"
              }),
        }),

        getCommnets: builder.query({
             query: (postId) => ( { url: `/comment/${postId}`, credentials: "include" }) ,
             providesTags: ['Post'],
         }) ,

         createComment: builder.mutation({
            query:(data)=>({
             url: `/comment/${data.postId}`,
             method:"POST",
             body:{text:data.text},
             credentials:"include"
            }),
            invalidatesTags:["Post"]
        }),

        followUser: builder.mutation({
            query: (userId) => ({
                url: `/user/${userId}/follow`,
                method:'PUT',
                credentials:"include"
              }),
        }),

        likePost: builder.mutation({
            query: (postId) => ({
                url: `/post/${postId}/like`,
                method:'PUT',
                credentials:"include"
              }),
        }),

        createStory: builder.mutation({
            query:(data)=>({
             url: '/story',
             method:"POST",
             body:data,
             credentials:"include"
            }),
            invalidatesTags:["Post"]
        }),

        getAllStory: builder.query({
            // query: () => '/post',
             query: () => ( { url: `/story`, credentials: "include" }) ,
             providesTags: ['Post'],
         }) ,

         updateUser:builder.mutation({
            query:(data)=>({
                url: `/auth/update`,
                body: data,
                method: 'PUT',
                credentials:"include"  
            })
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

export const {useGetAllPostQuery,useGetAllPostByUserIdQuery,
    useGetPostsDataMutation,useGetAuthorInfoMutation,
    useGetAuthorDataQuery,useGetUserDataQuery,
    useCreatePostMutation, useGetCommnetsQuery,
    useCreateCommentMutation,useFollowUserMutation,
    useLikePostMutation, useCreateStoryMutation,
    useGetAllStoryQuery,useUpdateUserMutation,
    useRegisterMutation,useLoginMutation} = userApiSlice;