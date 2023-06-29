import { useState, memo } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentsList from '../CommentsList/CommentsList'
import PopupModal from '../PopupModal/PopupModal'
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal';
import DeletePostModal from '../DeletePostModal/DeletePostModal';
import { postsAPI } from '../../services/postsService';
import { FAVORITES_POSTS } from '../../utils/storageKeys'
import { addItemToStorage, deleteItemToStorage } from '../../utils/updateStorage'

const PostCard = ({ post, flagColor, tmpPosts, setTmpPosts }) => {

    //console.log('POST INTO POST', post)

    const [updatePost, {}] = postsAPI.useUpdatePostMutation()

    const [tmpPost, setTmpPost] = useState(post)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [cardBackColor, setCardBackColor] = useState(flagColor ? '#fffce3' : '')
    const [checkFavor, setCheckFavor] = useState(flagColor)

    const handleShowComments = () => setShowComments(!showComments)
    const handleShowUpdateModal = () => setShowUpdateModal(!showUpdateModal)
    const handleShowDeleteModal = () => setShowDeleteModal(!showDeleteModal)

    function handleAddFavorites () {
        if (addItemToStorage(FAVORITES_POSTS, tmpPost)) {
            setCheckFavor(!checkFavor)
            setCardBackColor('#fffce3')
        }
    }

    function handleDeleteFavorites () {
        if (deleteItemToStorage(FAVORITES_POSTS, tmpPost)) {
            setCheckFavor(!checkFavor)
            setCardBackColor('')
        }
    }

    const handleUpdatePost = (data) => {
        updatePost({...post, 
            title: data.postTitle, 
            body: data.postBody
        })
        setTmpPost({...post, 
            title: data.postTitle, 
            body: data.postBody, 
            author: data.postAuthor
        })
        handleShowUpdateModal()
    }

    const iconStyle = { color: 'black', size: { fontSize: '27px' } }

    return (
        <>
            <Card sx={{maxWidth: 640}} className='product-card' style = {{marginTop: '20px', backgroundColor: cardBackColor}}>
                <CardHeader
                    className="productCard-header"
                    title={tmpPost.title}
                    subheader={tmpPost.author}
                />
                <CardContent>
                    <Typography style={{color: 'black'}} variant="body1" color="text.secondary" fontWeight="medium">
                        {tmpPost.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing style={{color: 'black', width: '250px', display: 'flex', justifyContent: 'space-around', paddingBottom: '15px'}}>
                    <IconButton onClick={handleShowComments} style={iconStyle}>
                        <CommentIcon style = {iconStyle.size}/>
                    </IconButton>
                    <IconButton style={iconStyle} onClick = {handleShowUpdateModal}>
                        <EditIcon style = {iconStyle.size}/>
                    </IconButton>
                    <IconButton style={iconStyle}>
                        { checkFavor  ? 
                            <StarIcon 
                                onClick = {handleDeleteFavorites}
                                style = {iconStyle.size}
                            /> 
                        : 
                            <StarBorderIcon 
                                onClick = {handleAddFavorites}
                                style = {iconStyle.size}
                            />
                        }
                    </IconButton>
                    <IconButton style={iconStyle} onClick = {handleShowDeleteModal}>
                        <DeleteIcon style = {iconStyle.size}/>
                    </IconButton>
                </CardActions>
                {showComments ? <CommentsList post = {tmpPost} handleShowComments = {handleShowComments}/> : null}
                { showDeleteModal ? 
                <PopupModal setShow = {handleShowDeleteModal} width = {400}>
                    <DeletePostModal 
                        post = {tmpPost}
                        setShow = {handleShowDeleteModal} 
                        label = {"пост"}
                        tmpPosts = {tmpPosts}
                        setTmpPosts = {setTmpPosts}
                    />
                </PopupModal> 
                : null }
                { showUpdateModal ?
                <PopupModal setShow = {handleShowUpdateModal} width = {640}>
                    <UpdatePostModal
                        post = {tmpPost}
                        setShow = {handleShowUpdateModal}
                        update = {handleUpdatePost} 
                    />
                </PopupModal>
                : null }
            </Card>
        </>
    )
}

export default memo(PostCard)