import { POSTS_FILTER_KEYS } from "./filterKeys";

export function filterPostsByKey (key, array, fieldValue) {
    const { FILTER_BY_POST_NAME, FILTER_BY_POST_AUTHOR } = POSTS_FILTER_KEYS
    switch (key) {
        case FILTER_BY_POST_AUTHOR: {
            let tmp = [...array]
            tmp = tmp?.filter(post => {
               return post.author.toLowerCase().includes(fieldValue.toLowerCase())
            })
            return tmp;
        }
        case FILTER_BY_POST_NAME: {
            let tmp = [...array]
            tmp = array?.filter(post => {
               return post.title.toLowerCase().includes(fieldValue.toLowerCase())
            })
            return tmp;
        }
        default: {
           return array;
       }
   }
}