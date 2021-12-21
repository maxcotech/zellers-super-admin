import { STAFF_TOKEN_ACTION_TYPES } from "../action_types/StaffTokenActionTypes";

const initState = {
    tokens:[],
    links:[],
    current_link:null
}

const StaffTokenReducer = (state = initState, action) => {
    switch(action.type){
        case STAFF_TOKEN_ACTION_TYPES.setStaffTokens:
            return {
                ...state,
                tokens:action.payload.data,
                links:action.payload.links,
            };
        case STAFF_TOKEN_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            }
        default: return state;
    }
}

export default StaffTokenReducer;