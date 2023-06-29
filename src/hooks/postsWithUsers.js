import { useEffect, useState } from 'react'
import { postsAPI } from '../services/postsService'
import { usersAPI } from '../services/usersService'

export function usePostsAndUsers(queryLimit) {
    
    const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useFetchAllUsersQuery();
    const { data: posts, error: postsError, isLoading: postsLoading } = postsAPI.useFetchAllPostsQuery(queryLimit);

    const [newPosts, setNewPosts] = useState([])
    const [newUsers, setNewUsers] = useState([])

    let tmpPosts = []
    posts?.map((post) => {
        let obj = {...post};
        obj['author'] = users?.find(us => us.id === post.userId)?.name;
        tmpPosts.push(obj)
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
        setNewPosts(tmpPosts)
        setNewUsers(tmpUsers)
    }, [posts, users])

    return { newPosts, newUsers, postsError, postsLoading, usersError, usersLoading }
}