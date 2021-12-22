import { USER_ACTION_TYPES } from "../action_types/UsersActionTypes";

const initState = {
    users:[],
    links:[],
    current_link:null
}

const UserReducer = (state = initState, action) => {
    switch(action.type){
        case USER_ACTION_TYPES.setUsers:
            const {data,links} = action.payload;
            return {
                ...state,
                users:data,
                links
            };
        case USER_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        default: return state;
    }
}

export default UserReducer;