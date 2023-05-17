import data from 'userdata.json';


var initialState = {
    itemArray : [],
    searchArray : [],
    udata: data,
    perpage:3,
    searchText:'',
    pageStartIndex:0,
    paginArray:[]
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            var idgenerator = action?.payload;
            idgenerator.id = Math.floor(1000 + Math.random() * 90000);
            return {
                ...state,
                itemArray:[...state.itemArray,idgenerator]
            }
        case 'REMOVE_ITEM':
            let removedArrr = state.itemArray?.filter(item => item?.id !==  action?.payload)
            return {
                ...state,
                itemArray:removedArrr,
                paginArray:removedArrr
            } 
        case 'PAGINATION_ITEM':
            let pagArray = state?.itemArray.slice(action?.payload , action?.payload + state?.perpage)
            return {
                ...state,
                paginArray:pagArray
            }
        case 'SEARCH_ITEM':
            let seArrr = state.itemArray?.filter(item =>  item?.name.toLowerCase().includes(action?.payload.toLowerCase()) )
            return {
                ...state,
                searchText : action?.payload,
                searchArray:seArrr,
            }
        
        default:
            return {
                ...state,
            };

    }

}

