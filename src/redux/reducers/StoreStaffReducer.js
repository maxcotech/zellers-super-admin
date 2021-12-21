import { STAFF_ACTION_TYPES } from "../action_types/StaffActionTypes";

const initState = {
    store_staffs:[],
    links:[],
    current_link:null,
    filters:{
        status:"",
        staff_type:""
    }
}

const StoreStaffReducer = (state = initState,action) => {
    switch(action.type){
        case STAFF_ACTION_TYPES.setStoreStaffs:
            const payload = action.payload;
            return {
                ...state,
                store_staffs:payload.data,
                links:payload.links
            };
        case STAFF_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        case STAFF_ACTION_TYPES.setFilters:
            return {
                ...state,
                filters:action.payload
            };
        default: return state;
    }
}

export default StoreStaffReducer;