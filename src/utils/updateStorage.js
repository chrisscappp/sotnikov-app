export function addItemToStorage(key, item) {
    let tmpArr = JSON.parse(localStorage.getItem(key))
    let tmpFind = tmpArr.find(ps => ps.id === item.id)
    if (tmpFind) {
        return false;
    } else {
        tmpArr.push(item)
        localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(tmpArr))
        return true;
    }
}

export function deleteItemToStorage(key, item) {
    let tmpArr = JSON.parse(localStorage.getItem(key))
    let tmpFind = tmpArr.find(ps => ps.id === item.id)
    if (tmpFind) {
        let newArr = tmpArr.filter(it => it.id !== tmpFind.id)
        localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(newArr))
        return true;
    } else {
        return false;
    }
}