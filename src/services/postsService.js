import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL, POSTS_URL, COMMENTS_URL } from "../utils/url";

export const postsAPI = createApi({
    reducerPath: 'postsAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query({
            query: (limit = 10) => ({
                url: POSTS_URL,
                params: limit === 'все' ? {} : {_limit: limit}
            }),
            providesTags: result => ['Post']
        }),
        fetchComments: build.query({
            query: (id) => ({
                url: `${POSTS_URL}/${id}${COMMENTS_URL}`,
                params: {}
            }),
            providesTags: result => ['Post']
        }),
        createPost: build.mutation({
            query: (post) => ({
                url: POSTS_URL,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post'] 
        }),
        updatePost: build.mutation({
            query: (post) => ({
                url: `${POSTS_URL}/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation({
            query: (post) => ({
                url: `${POSTS_URL}/${post.id}`,
                method: 'DELETE',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        
    })
})