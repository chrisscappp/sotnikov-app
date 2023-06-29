import { memo } from 'react'
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css'

const CommentsItem = ({comment}) => {

    // в апи нет связи с users и comments. где брать имена юсеров?

    return (
        <>
            <div className = "comments__item-wrapper">
                <CardHeader
                    className="comments__item-wrapper__header"
                    title={comment.email}
                />
                <CardContent>
                    <Typography style={{color: 'black'}} variant="body1" color="text.secondary" fontWeight="medium">
                        {comment.body}
                    </Typography>
                </CardContent>
            </div>
        </>
    )
}

export default memo(CommentsItem)