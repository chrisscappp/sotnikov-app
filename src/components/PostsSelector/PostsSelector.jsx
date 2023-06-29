import { memo } from 'react'
import MenuItem from '@mui/material/MenuItem';
import SelectComponent from "../SelectComponent/SelectComponent";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { POSTS_FILTER_KEYS } from '../../utils/filterKeys';
import { POSTS_SORT_KEYS } from '../../utils/sortKeys'
import { FAVORITES_POSTS } from '../../utils/storageKeys';

const selectProp = { 
    query: { inputLabel: "Запрос", helperText: "Количество выводимых постов" },
    filter: { inputLabel: "Фильтр", helperText: "Фильтрация выводимых постов",},
    sort: { inputLabel: "Сортировка по", helperText: "Сортировка выводимых постов",} 
}

const PostsSelector = ({handleSetQueryLimit, setFilterKey, handleShowAddModal, setFilteredPosts, currentItems, sortPosts}) => {

    const { FILTER_BY_POST_AUTHOR, FILTER_BY_POST_FAVORITES, FILTER_BY_POST_NAME } = POSTS_FILTER_KEYS
    const { BY_MAX_ID, BY_MIN_ID, BY_POST_AUTHOR, BY_POST_FAVORITES, BY_POST_NAME } = POSTS_SORT_KEYS

    function filterByFavorites () {
        let tmpArr = JSON.parse(localStorage.getItem(FAVORITES_POSTS))
        setFilteredPosts(currentItems?.filter(post => {
            return tmpArr.find(ps => ps.id === post.id)
        }))
    } // p.s - в консоль данные приходят корректные. почему выводит не так - не знаю

    return (
        <>
            <Container fixed>
                <Grid container spacing={1} style = {{display: 'flex', justifyContent: 'center', paddingTop: '15px'}}>
                    <SelectComponent selectProp = {selectProp.query}>
                        <MenuItem value={10} onClick = {(event) => handleSetQueryLimit(event)}>10</MenuItem>
                        <MenuItem value={20} onClick = {(event) => handleSetQueryLimit(event)}>20</MenuItem>
                        <MenuItem value={50} onClick = {(event) => handleSetQueryLimit(event)}>50</MenuItem>
                        <MenuItem value={100} onClick = {(event) => handleSetQueryLimit(event)}>100</MenuItem>
                        <MenuItem value={'все'} onClick = {(event) => handleSetQueryLimit(event)}>все</MenuItem>
                    </SelectComponent>
                    <SelectComponent selectProp = {selectProp.filter}>
                        <MenuItem value={FILTER_BY_POST_NAME} onClick = {() => {
                            setFilterKey(FILTER_BY_POST_NAME)
                            setFilteredPosts(currentItems)
                        }}>имя поста</MenuItem>
                        <MenuItem value={FILTER_BY_POST_AUTHOR} onClick = {() => {
                            setFilterKey(FILTER_BY_POST_AUTHOR)
                            setFilteredPosts(currentItems)
                        }}>имя пользователя</MenuItem>
                        <MenuItem value={FILTER_BY_POST_FAVORITES} onClick = {() => {
                            filterByFavorites()
                        }}>по списку избранных</MenuItem>
                    </SelectComponent>
                    <SelectComponent selectProp = {selectProp.sort}>
                        <MenuItem value={BY_MIN_ID} onClick = {() => sortPosts(BY_MIN_ID)}>возрастанию</MenuItem>
                        <MenuItem value={BY_MAX_ID} onClick = {() => sortPosts(BY_MAX_ID)}>убыванию</MenuItem>
                        <MenuItem value={BY_POST_NAME} onClick = {() => sortPosts(BY_POST_NAME)}>названию поста</MenuItem>
                        <MenuItem value={BY_POST_AUTHOR} onClick = {() => sortPosts(BY_POST_AUTHOR)}>имени автора поста</MenuItem>
                        <MenuItem value={BY_POST_FAVORITES} onClick = {() => sortPosts(BY_POST_FAVORITES)}>списку избранных</MenuItem>
                    </SelectComponent>
                    <div style={{paddingTop: '18px'}}>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        style = {{width: '110px', height: '56px'}}
                        onClick = {handleShowAddModal}
                    >
                        новый пост
                    </Button>
                    </div>
                    
                </Grid>
            </Container>
        </>
    )
}

export default memo(PostsSelector)