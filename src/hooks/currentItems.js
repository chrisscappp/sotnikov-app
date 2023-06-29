const ELEM_IN_PAGE = 15;

export function useCurrentItems (items, itemOffset) {

    let endOffset = itemOffset + ELEM_IN_PAGE;
    let currentItems = items.slice(itemOffset, endOffset);
    if (currentItems.length === 0) currentItems = items.slice(0, ELEM_IN_PAGE);
    
    return { currentItems } 
}