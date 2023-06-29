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
import DeleteAlbumModal from '../DeleteAlbumModal/DeleteAlbumModal';
import { FAVORITES_ALBUMS } from '../../utils/storageKeys'
import { addItemToStorage, deleteItemToStorage } from '../../utils/updateStorage'

const PostCard = ({ album, flagColor, tmpAlbums, setTmpAlbums }) => {

    const [tmpAlbum, setTmpAlbum] = useState(album)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [cardBackColor, setCardBackColor] = useState(flagColor ? '#fffce3' : '')
    const [checkFavor, setCheckFavor] = useState(flagColor)

    const handleShowDeleteModal = () => setShowDeleteModal(!showDeleteModal)

    

    function handleAddFavorites () {
        if (addItemToStorage(FAVORITES_ALBUMS, tmpAlbum)) {
            setCheckFavor(!checkFavor)
            setCardBackColor('#fffce3')
        }
    }

    function handleDeleteFavorites () {
        if (deleteItemToStorage(FAVORITES_ALBUMS, tmpAlbum)) {
            setCheckFavor(!checkFavor)
            setCardBackColor('')
        }
    }

    const iconStyle = { color: 'black', size: { fontSize: '27px' } }

    return (
        <>
            <Card sx={{maxWidth: 640}} className='album-card' style = {{marginTop: '20px', backgroundColor: cardBackColor}}>
                <CardHeader
                    className="albumCard-header"
                    title={`Album: ${tmpAlbum.title}`}
                    subheader={tmpAlbum.author}
                />
                <CardContent>
                </CardContent>
                <CardActions disableSpacing style={{color: 'black', width: '250px', display: 'flex', justifyContent: 'space-around', paddingBottom: '15px'}}>
                    <IconButton style={iconStyle}>
                        <CommentIcon style = {iconStyle.size}/>
                    </IconButton>
                    <IconButton style={iconStyle}>
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
                { showDeleteModal ? 
                <PopupModal setShow = {handleShowDeleteModal} width = {400}>
                    <DeleteAlbumModal 
                        album = {tmpAlbum}
                        setShow = {handleShowDeleteModal} 
                        label = {"альбом"}
                        tmpAlbums = {tmpAlbums}
                        setTmpAlbums = {setTmpAlbums}
                    />
                </PopupModal> 
                : null }
            </Card>
        </>
    )
}

export default memo(PostCard)