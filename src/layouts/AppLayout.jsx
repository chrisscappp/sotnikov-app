import { Routes, Route } from "react-router-dom"
import PostsLayout from './PostsLayout'
import AlbumsLayout from './AlbumsLayout'
import TodosLayout from './TodosLayout'
import ErrorLayout from './ErrorLayout'
import AppBarMenu from '../components/AppBar/AppBar'
import { FAVORITES_POSTS, FAVORITES_ALBUMS } from "../utils/storageKeys"

const AppLayout = () => {

    if (!localStorage.getItem(FAVORITES_POSTS)) {
        localStorage.setItem(FAVORITES_POSTS, JSON.stringify([]))
    }

    if (!localStorage.getItem(FAVORITES_ALBUMS)) {
        localStorage.setItem(FAVORITES_ALBUMS, JSON.stringify([]))
    }

    return (
        <>
            <AppBarMenu/>
            <Routes>
                <Route path = "/" element = { <PostsLayout/> }/>
                <Route path = "/albums" element = { <AlbumsLayout/> }/>
                <Route path = "/todos" element = { <TodosLayout/> }/>
                <Route path = "*" element = { <ErrorLayout/> }/>
            </Routes>
        </>
    )
}

export default AppLayout