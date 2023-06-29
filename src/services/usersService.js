import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL, USERS_URL } from "../utils/url";

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: result => ['User']
        }),
        createUser: build.mutation({
            query: (user) => ({
                url: USERS_URL,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User'] 
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: `${USERS_URL}/${user.id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation({
            query: (user) => ({
                url: `${USERS_URL}/${user.id}`,
                method: 'DELETE',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
})