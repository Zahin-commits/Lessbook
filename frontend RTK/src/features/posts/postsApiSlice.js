import { PostsQuerySlice } from "./postsQuerySlice";


export const postsApiSlice =  PostsQuerySlice.injectEndpoints({
    endpoints: (builder)=>({
        
        getPostsData: builder.mutation({
            query: () => ({
                url: '/post',
                method: 'GET',
                credentials:"include"
              }),
        })    
    })
})

export const {useGetPostsDataMutation} = postsApiSlice;
