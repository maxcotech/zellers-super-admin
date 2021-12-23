import { STORE_ACTION_TYPES } from "../action_types/StoreActionTypes";


const initState = {
    stores:[],
    current_link:null,
    links:[]
}

const StoreReducer = (state = initState, action) => {
    switch(action.type){
        case STORE_ACTION_TYPES.setStores:
            const {data,links} = action.payload;
            return {...state,stores:data,links};
        case STORE_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            }
        default:return state;
    }
}

export default StoreReducer;