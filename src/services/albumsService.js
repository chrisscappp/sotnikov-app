import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL, ALBUMS_URL, PHOTOS_URL } from "../utils/url";

export const albumsAPI = createApi({
    reducerPath: 'albumsAPI',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Album', 'Photo'],
    endpoints: (build) => ({
        fetchAllAlbums: build.query({
            query: (limit = 10) => ({
                url: ALBUMS_URL,
                params: limit === 'все' ? {} : {_limit: limit}
            }),
            providesTags: result => ['Album']
        }),
        fetchPhotos: build.query({
            query: () => ({
                url: PHOTOS_URL,
                params: {}
            }),
            providesTags: result => ['Photo']
        }),
        updateAlbum: build.mutation({
            query: (album) => ({
                url: `${ALBUMS_URL}/${album.id}`,
                method: 'PUT',
                body: album
            }),
            invalidatesTags: ['Album']
        }),
        deletePost: build.mutation({
            query: (album) => ({
                url: `${ALBUMS_URL}/${album.id}`,
                method: 'DELETE',
                body: album
            }),
            invalidatesTags: ['Album']
        })
    })
})