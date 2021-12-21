import { STORE_ACTION_TYPES } from "../action_types/StoreActionTypes";


const initState = {
    current_store:null,
    stores:[],
    staff_type: null,
    staff_type_text:null
}

const StoreReducer = (state = initState, action) => {
    switch(action.type){
        case STORE_ACTION_TYPES.setCurrentStoreData:
            return {...state,current_store:action.payload};
        case STORE_ACTION_TYPES.setStore:
            return {...state,stores:action.payload.stores,
                current_store:action.payload.current_store};
        case STORE_ACTION_TYPES.setStaffType:
            return {...state,...action.payload}
        default:return state;
    }
}

export default StoreReducer;