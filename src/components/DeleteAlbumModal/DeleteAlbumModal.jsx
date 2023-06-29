import { memo } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { albumsAPI } from '../../services/albumsService';
import { deleteItemToStorage } from '../../utils/updateStorage'
import { FAVORITES_ALBUMS } from '../../utils/storageKeys'
import './style.css'

const DeleteAlbumModal = ({album, setShow, label, tmpAlbums, setTmpAlbums}) => {

    const [deleteAlbum, {}] = albumsAPI.useDeletePostMutation()

    function handleDeletePost () {
        deleteItemToStorage(FAVORITES_ALBUMS, album)
        deleteAlbum(album)
        setTmpAlbums(tmpAlbums.filter(ps => ps.id !== album.id))
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

export default memo(DeleteAlbumModal)