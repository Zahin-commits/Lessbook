import { PostsQuerySlice } from "./postsQuerySlice";


export const postsApiSlice =  PostsQuerySlice.injectEndpoints({
    endpoints: (builder)=>({
        
        getAllPost2: builder.query({
            // query: () => '/post',
             query: () => ( { url: `/post`, credentials: "include" }) ,
             providesTags: ['Test'],
         }) ,   
    })
})

export const {useGetAllPost2Query} = postsApiSlice;
