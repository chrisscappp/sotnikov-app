import AlbumCard from "../components/AlbumCard/AlbumCard";
import { albumsAPI } from "../services/albumsService";
import { usersAPI } from "../services/usersService";
import { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import SelectComponent from '../components/SelectComponent/SelectComponent';
import MenuItem from '@mui/material/MenuItem';
import Spinner from '../components/Spinner/Spinner'
import ErrorComponent from '../components/ErrorComponent/ErrorComponent'
import Footer from "../components/Footer/Footer";
import { ALBUMS_QUERY_LIMIT, FAVORITES_ALBUMS } from '../utils/storageKeys'
import { useAlbumsWithUsers } from "../hooks/albumsWithUsers";
import { useCurrentItems } from '../hooks/currentItems'
import { filterPostsByKey } from '../utils/filter'
import { sortPostsByKey } from "../utils/sort";
import './style.css'

const selectProp = { 
    query: { inputLabel: "Запрос", helperText: "Количество выводимых альбомов" },
    filter: { inputLabel: "Фильтр", helperText: "Фильтрация выводимых альбомов",},
    sort: { inputLabel: "Сортировка по", helperText: "Сортировка выводимых альбомов",} 
}

const SCREEN_WIDTH = window.screen.width 
const ELEM_IN_PAGE = 15;

const AlbumsLayout = () => {

    const [queryLimit, setQueryLimit] = useState(localStorage.getItem(ALBUMS_QUERY_LIMIT) ? localStorage.getItem(ALBUMS_QUERY_LIMIT) : 10)
    const [ createUser, {} ] = usersAPI.useCreateUserMutation()
    const [ updateAlbum, {} ] = albumsAPI.useUpdateAlbumMutation()

    const { newAlbums, newUsers, albumsError, albumsLoading, usersError, usersLoading } = useAlbumsWithUsers(queryLimit)
    const [tmpAlbums, setTmpAlbums] = useState(newAlbums)
    const [tmpUsers, setTmpUsers] = useState(newUsers)
    const [showAddModal, setShowAddModal] = useState(false)

    const [filterKey, setFilterKey] = useState("")
    const [fieldValue, setFieldValue] = useState('')

    const [itemOffset, setItemOffset] = useState(0);

    const { currentItems } = useCurrentItems(tmpAlbums, itemOffset)

    const pageCount = Math.ceil(tmpAlbums.length / ELEM_IN_PAGE);

    const [filteredAlbums, setFilteredAlbums] = useState(currentItems)

    useEffect(() => {
        setTmpUsers(newUsers)
    }, [newUsers])

    useEffect(() => {
        setTmpAlbums(newAlbums)
    }, [newAlbums])

    useEffect(() => {
        setFilteredAlbums(currentItems)
    }, [itemOffset, tmpAlbums])

    const handleShowAddModal = () => setShowAddModal(!showAddModal)
    
    const handlePageClick = async (e, page) => {
        const newOffset = ((page - 1) * ELEM_IN_PAGE) % tmpAlbums.length;
        setItemOffset(newOffset);
        setFilteredAlbums([...currentItems])
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function handleSetQueryLimit (event) {
        const value = event.target.innerText
        localStorage.setItem(ALBUMS_QUERY_LIMIT, value);
        setQueryLimit(value)
    }

    const handleSetField = async (e) => {
        const { value } = e.target
        setFieldValue(value)
    } // сделали ввод инпута асинхронным

    useEffect(() => {
        if (fieldValue) {
            console.log(fieldValue)
        }
    }, [fieldValue])

    if (albumsError) return <ErrorComponent errStatus = {albumsError.status}/>
    if (usersError) return <ErrorComponent errStatus = {usersError.status}/>
    
    console.log('WOWOWOO', filteredAlbums)

    return (
        <>
            <Container fixed style={{backgroundColor: '#e8e8e8', borderRadius: '0 0 20px 20px'}}>
                {albumsLoading && usersLoading && <Spinner/>}
                <SelectComponent selectProp = {selectProp.query}>
                    <MenuItem value={10} onClick = {(event) => handleSetQueryLimit(event)}>10</MenuItem>
                    <MenuItem value={20} onClick = {(event) => handleSetQueryLimit(event)}>20</MenuItem>
                    <MenuItem value={50} onClick = {(event) => handleSetQueryLimit(event)}>50</MenuItem>
                    <MenuItem value={100} onClick = {(event) => handleSetQueryLimit(event)}>100</MenuItem>
                    <MenuItem value={'все'} onClick = {(event) => handleSetQueryLimit(event)}>все</MenuItem>
                </SelectComponent>
                <div className = "field__filter__value-container">
                    <TextField
                        disabled = {!filterKey}
                        id="outlined-multiline-static"
                        label="Поиск"
                        sx={{width: 570}}
                        onChange = {(event) => handleSetField(event)}
                    />
                </div>

                <div className="albums-wrapper" style={{display: 'flex',justifyContent: 'center'}}>
                    <div item = "true" container = "true" spacing={1} className="products_container">
                        <div>
                            {
                                tmpUsers ? 
                                filteredAlbums.map((album) => {
                                    let check = false;
                                    let tmpArr = JSON.parse(localStorage.getItem(FAVORITES_ALBUMS))
                                    let tmpFind = tmpArr?.find(ps => ps.id === album.id)

                                    if (tmpFind) check = true;
    
                                    return (
                                        <AlbumCard 
                                            key = {album.id} 
                                            album = {album}
                                            flagColor = {check}
                                            tmpAlbums = {tmpAlbums}
                                            setTmpAlbums = {setTmpAlbums}
                                        />
                                    )
                                }) 
                                : <h3>Список пуст</h3>
                            }
                            { 
                            filteredAlbums.length === 0 ?
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
            <Footer/>
        </>
    )
}

export default AlbumsLayout