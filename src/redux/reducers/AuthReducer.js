import { AUTH_ACTION_TYPES } from "../action_types/AuthActionTypes";

const initState = {
    currency:null,
    country:null,
    logged_in:false,
    user:null,
    init:false
}

const AuthReducer = (state = initState,action) => {
    switch(action.type){
        case AUTH_ACTION_TYPES.setUserData:
            return {...action.payload,init:true};
        default: return state;
    }
}

export default AuthReducer;