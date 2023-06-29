import { POSTS_SORT_KEYS } from "./sortKeys";
import { FAVORITES_POSTS } from "./storageKeys";

export function sortPostsByKey (key, array) {

    const { BY_MAX_ID, BY_MIN_ID, BY_POST_AUTHOR, BY_POST_FAVORITES, BY_POST_NAME } = POSTS_SORT_KEYS

    switch (key) {
        case BY_MIN_ID: {
            return array.sort((prev, next) => prev.id - next.id);
        }
        case BY_MAX_ID: {
            return array.sort((prev, next) => next.id - prev.id);
        }
        case BY_POST_AUTHOR: {
            return array.sort((prev, next) => ('' + prev.author).localeCompare(next.author));
        }
        case BY_POST_NAME: {
            return array.sort((prev, next) => ('' + prev.title).localeCompare(next.title));
        }
        case BY_POST_FAVORITES: {
            let tmpArr = JSON.parse(localStorage.getItem(FAVORITES_POSTS))
            let copy = [...array]
            let tmpNew = []
            array.map((item) => {
                let tmpObj = tmpArr.find(ps => ps.id === item.id)
                if (tmpObj !== undefined) tmpNew.push(tmpObj)
            })
            tmpNew.forEach((item) => {
                copy = copy.filter(it => it.id !== item.id)
            })
            let endNew = tmpNew.concat(copy)
            return endNew;
            
        }
        default: return array;
    }
}