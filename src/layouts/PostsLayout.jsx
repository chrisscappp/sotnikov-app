import PostCard from "../components/PostCard/PostCard";
import { postsAPI } from "../services/postsService";
import { usersAPI } from "../services/usersService";
import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import PopupModal from "../components/PopupModal/PopupModal";
import UpdatePostModal from "../components/UpdatePostModal/UpdatePostModal"; 
import PostsSelector from "../components/PostsSelector/PostsSelector";
import Spinner from '../components/Spinner/Spinner'
import ErrorComponent from '../components/ErrorComponent/ErrorComponent'
import Footer from "../components/Footer/Footer";
import { POSTS_QUERY_LIMIT, FAVORITES_POSTS } from '../utils/storageKeys'
import { usePostsAndUsers}  from '../hooks/postsWithUsers'
import { useCurrentItems } from '../hooks/currentItems'
import { filterPostsByKey } from '../utils/filter'
import { sortPostsByKey } from "../utils/sort";
import './style.css'

const SCREEN_WIDTH = window.screen.width 
const ELEM_IN_PAGE = 15;

const PostsLayout = () => {

    const [queryLimit, setQueryLimit] = useState(localStorage.getItem(POSTS_QUERY_LIMIT) ? localStorage.getItem(POSTS_QUERY_LIMIT) : 10)
    const [ createUser, {} ] = usersAPI.useCreateUserMutation()
    const [ createPost, {} ] = postsAPI.useCreatePostMutation()

    const { newPosts, newUsers, postsError, postsLoading, usersError, usersLoading } = usePostsAndUsers(queryLimit)
    const [tmpPosts, setTmpPosts] = useState(newPosts)
    const [tmpUsers, setTmpUsers] = useState(newUsers)
    const [showAddModal, setShowAddModal] = useState(false)

    const [filterKey, setFilterKey] = useState("")
    const [fieldValue, setFieldValue] = useState('')

    const [itemOffset, setItemOffset] = useState(0);

    const { currentItems } = useCurrentItems(tmpPosts, itemOffset)

    const pageCount = Math.ceil(tmpPosts.length / ELEM_IN_PAGE);

    const [filteredPosts, setFilteredPosts] = useState(currentItems)

    useEffect(() => {
        setTmpUsers(newUsers)
    }, [newUsers])

    useEffect(() => {
        setTmpPosts(newPosts)
    }, [newPosts])

    useEffect(() => {
        setFilteredPosts(currentItems)
    }, [itemOffset, tmpPosts])

    const handleShowAddModal = () => setShowAddModal(!showAddModal)

    const handlePageClick = async (e, page) => {
        const newOffset = ((page - 1) * ELEM_IN_PAGE) % tmpPosts.length;
        setItemOffset(newOffset);
        setFilteredPosts([...currentItems])
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function handleSetQueryLimit (event) {
        const value = event.target.innerText
        localStorage.setItem(POSTS_QUERY_LIMIT, value);
        setQueryLimit(value)
    }

    const handleAddNewPost = async (data) => {
        let user = { name: data.postAuthor }
        let post = {
            title: data.postTitle, 
            author: data.postAuthor, body: data.postBody,
        }
        let fnUser = tmpUsers.find(us => us.name === user.name)
        if (fnUser === undefined) {
            await createUser(user) // добавляем с неполными полями
            await createPost(post)
            user.id = tmpUsers.length + 1
            post.userId = user.id
            post.id = newPosts.length + 1;
            setTmpUsers([...tmpUsers, user])
            setTmpPosts([...tmpPosts, post])
        } else {
            await createPost(post)
            post.userId = fnUser.id
            post.id = newPosts.length + 1;
            setTmpPosts([...tmpPosts, post])
        }
        handleShowAddModal()
    }

    const handleSetField = async (e) => {
        const { value } = e.target
        setFieldValue(value)
    } // сделали ввод инпута асинхронным

    useEffect(() => {
        if (fieldValue) {
            filterPosts()
        }
    }, [fieldValue])

    function filterPosts () {
        if (fieldValue === "") setFilteredPosts(currentItems)
        let arr = filterPostsByKey(filterKey, currentItems, fieldValue)
        setFilteredPosts(arr)
    }

    function sortPosts (key) {
        let t = [...filteredPosts]
        let tmp = sortPostsByKey(key, t)
        setFilteredPosts(tmp)
    }

    if (postsError) return <ErrorComponent errStatus = {postsError.status}/>
    if (usersError) return <ErrorComponent errStatus = {usersError.status}/>
    
    console.log('WOWOWOO', filteredPosts)

    return (
        <>
            <Container fixed style={{backgroundColor: '#e8e8e8', borderRadius: '0 0 20px 20px'}}>
                {postsLoading && usersLoading && <Spinner/>}
                <PostsSelector 
                    handleSetQueryLimit = {handleSetQueryLimit}
                    setFilterKey = {setFilterKey}
                    handleShowAddModal = {handleShowAddModal}
                    setFilteredPosts = {setFilteredPosts}
                    currentItems = {currentItems}
                    sortPosts = {sortPosts}
                />
                <div className = "field__filter__value-container">
                    <TextField
                        disabled = {!filterKey}
                        id="outlined-multiline-static"
                        label="Поиск"
                        sx={{width: 570}}
                        onChange = {(event) => handleSetField(event)}
                    />
                </div>

                <div className="products-wrapper" style={{display: 'flex',justifyContent: 'center'}}>
                    <div item = "true" container = "true" spacing={1} className="products_container">
                        <div>
                            {
                                tmpUsers ? 
                                filteredPosts.map((post) => {
                                    let check = false;
                                    let tmpArr = JSON.parse(localStorage.getItem(FAVORITES_POSTS))
                                    let tmpFind = tmpArr.find(ps => ps.id === post.id)

                                    if (tmpFind) check = true;
    
                                    return (
                                        <PostCard 
                                            key = {post.id} 
                                            post = {post}
                                            flagColor = {check}
                                            tmpPosts = {tmpPosts}
                                            setTmpPosts = {setTmpPosts}
                                        />
                                    )
                                }) 
                                : <h3>Список пуст</h3>
                            }
                            { 
                            filteredPosts.length === 0 ?
                                <p className = "filtered-empty__text">Совпадений не найдено</p>
                            : null 
                            }
                        </div>
                        <Pagination 
                            count={pageCount} 
                            onChange = {handlePageClick}
                            size = {SCREEN_WIDTH > 360 ? "large" : SCREEN_WIDTH > 300 && SCREEN_WIDTH < 360 ? "medium" : "small"}
                            className = "footer__pagination"
                        />
                    </div>
                </div>
            </Container>
            { showAddModal ? 
                <PopupModal setShow = {handleShowAddModal} width = {640}>
                    <UpdatePostModal
                        post = {{}}
                        setShow = {handleShowAddModal}
                        update = {handleAddNewPost}
                    /> 
                </PopupModal>
            : null }
            <Footer/>
        </>
    )
}

export default PostsLayout