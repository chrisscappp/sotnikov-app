import { memo } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { postsAPI } from '../../services/postsService';
import { deleteItemToStorage } from '../../utils/updateStorage'
import { FAVORITES_POSTS } from '../../utils/storageKeys'
import './style.css'

const DeletePostModal = ({post, setShow, label, tmpPosts, setTmpPosts}) => {

    const [deletePost, {}] = postsAPI.useDeletePostMutation()

    function handleDeletePost () {
        deleteItemToStorage(FAVORITES_POSTS, post)
        deletePost(post)
        setTmpPosts(tmpPosts.filter(ps => ps.id !== post.id))
        setShow()
    }

    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Удалить {label}?
            </Typography>
            <div 
                className = "delete__post__modal-button__container"
            >
                <Button variant="contained" color="error" onClick={handleDeletePost}>
                    Удалить
                </Button>
                <Button variant="outlined" color="success" onClick={setShow} style={{marginLeft: '25px'}}>
                    Назад
                </Button> 
            </div>
        </>
    )
}

export default memo(DeletePostModal)