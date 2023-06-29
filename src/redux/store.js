import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsAPI } from "../services/postsService"
import { usersAPI } from "../services/usersService"
import { albumsAPI } from "../services/albumsService"

const rootReducer = combineReducers({
    [postsAPI.reducerPath]: postsAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [albumsAPI.reducerPath]: albumsAPI.reducer
}) 

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat([
                postsAPI.middleware,
                usersAPI.middleware,
                albumsAPI.middleware
            ])
    })
}