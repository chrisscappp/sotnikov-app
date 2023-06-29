import { memo } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import './style.css'

const UpdatePostModal = ({post, setShow, update, fieldKey}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <>
            <form onSubmit={handleSubmit(update)}>
                <TextField
                    id="outlined-multiline-static"
                    label="Название поста"
                    className='post__title-input'
                    {...register("postTitle", {
                        required: true
                    })}
                    sx={{width: 570}}
                    defaultValue={post.title}
                />
                {errors.postTitle && errors.postTitle.type === 'required' && (
                    <p className = "empty-error">Поле не должно быть пустым</p>
                )}
                <TextField
                    id="outlined-multiline-static"
                    label="Фамилия и Имя отправителя"
                    className='post__username-input'
                    {...register("postAuthor", {
                        required: true,
                        pattern: /[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)/
                    })}
                    sx={{width: 570, marginTop: '20px'}}
                    defaultValue={post.author}
                />
                {errors.postAuthor && errors.postAuthor.type === 'required' && (
                    <p className = "empty-error">Поле не должно быть пустым</p>
                )}
                {errors.postAuthor && errors.postAuthor.type === 'pattern' && (
                    <p className = "empty-error">Имя некорректно</p>
                )}
                <TextField
                    id="outlined-multiline-static"
                    label="Текст"
                    className='post__body-input'
                    {...register("postBody", {
                        required: true
                    })}
                    sx={{width: 570, marginTop: '20px'}}
                    multiline
                    rows={4}
                    defaultValue={post.body}
                />
                {errors.postBody && errors.postBody.type === 'required' && (
                    <p className = "empty-error">Поле не должно быть пустым</p>
                )}
                <div className = "update__post__modal-button__container">
                    <Button 
                        variant="contained" 
                        color="success" 
                        type="submit"
                        value="submit"
                    >
                        Сохранить изменения
                    </Button>
                    <Button 
                        className = "update__post__modal-button__container__back-button" 
                        variant="outlined"
                        color="error" 
                        onClick={setShow}
                    >
                        Назад
                    </Button>
                </div>
            </form>
        </>
    )
}

export default memo(UpdatePostModal)