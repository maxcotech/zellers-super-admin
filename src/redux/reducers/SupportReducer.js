import { SUPPORT_ACTION_TYPES } from './../action_types/SupportActionTypes';

const initState = {
    messages:[],
    current_link:null,
    links:[],
    params:{}
}
const SupportReducer = (state = initState, {type,payload}) => {
    switch(type){
        case SUPPORT_ACTION_TYPES.setMessages:{
            const {data,links} = payload;
            return {...state,messages:data,links};
        };
        case SUPPORT_ACTION_TYPES.setParams:{
            return {...state,params:{...state.params,payload}};
        };
        case SUPPORT_ACTION_TYPES.setCurrentLink:
            return {...state,current_link:payload};
        default: return state;
    }
}

export default SupportReducer;