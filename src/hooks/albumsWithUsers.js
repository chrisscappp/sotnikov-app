import { useEffect, useState } from 'react'
import { albumsAPI } from '../services/albumsService'
import { usersAPI } from '../services/usersService'

export function useAlbumsWithUsers (queryLimit) {
    const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useFetchAllUsersQuery();
    const { data: albums, error: albumsError, isLoading: albumsLoading } = albumsAPI.useFetchAllAlbumsQuery(queryLimit);

    const [newAlbums, setNewAlbums] = useState([])
    const [newUsers, setNewUsers] = useState([])

    let tmpAlbums = []
    albums?.map((album) => {
        let obj = {...album};
        obj['author'] = users?.find(us => us.id === album.userId)?.name;
        tmpAlbums.push(obj)
    })

    let tmpUsers = [];
    users?.map((item) => {
         let obj = {
            id: item.id,
            name: item.name,
        }
        tmpUsers.push(obj)
    })

    useEffect(() => {
        setNewAlbums(tmpAlbums)
        setNewUsers(tmpUsers)
    }, [albums, users])

    return { newAlbums, newUsers, albumsError, albumsLoading, usersError, usersLoading }
}