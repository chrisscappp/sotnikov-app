import { memo } from 'react'
import { postsAPI } from '../../services/postsService'
import CommentsItem from '../CommentsItem/CommentsItem'
import Spinner from '../Spinner/Spinner'
import ErrorComponent from '../ErrorComponent/ErrorComponent'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CommentsList = ({post, handleShowComments}) => {

    const { data: comments, error, isLoading } = postsAPI.useFetchCommentsQuery(post.id)

    if (error) {
        return <ErrorComponent errStatus = {error.status}/>
    }

    return (
        <>
            <div>
                {isLoading && <Spinner/>}
                {
                    comments?.map((item, index) => {
                        return (
                            <>
                                <hr/>
                                <CommentsItem
                                    key = {item.id} 
                                    comment = {item}
                                />
                            </>
                        )
                    })
                }
                
                {isLoading ? null : 
                <div style = {{display: 'flex', justifyContent: 'flex-end', paddingBottom: '5px', paddingRight: '5px'}}>
                <p 
                    onClick = {() => handleShowComments(false)} 
                    style = {{paddingRight: '5px', cursor: 'pointer'}}
                >
                    Закрыть комментарии
                </p>
                <IconButton 
                    onClick = {() => handleShowComments(false)} 
                    style = {{color: 'black'}}
                >
                    <CloseIcon style = {{fontSize: '27px'}}/>
                </IconButton>
                </div>
                }
                
            </div>
        </>
    )
}

export default memo(CommentsList)