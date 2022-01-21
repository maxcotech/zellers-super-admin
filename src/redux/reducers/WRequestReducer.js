import { WREQUEST_ACTION_TYPES } from './../action_types/WRequestActionTypes';

const initState = {
    requests:[],
    current_link:null,
    params:{status:0},
    links:[]

}
const WRequestReducer = (state = initState, {type,payload}) => {
    switch(type){
        case WREQUEST_ACTION_TYPES.setRequests:{
            const {data,links} = payload;
            return {
                ...state,
                requests:data,
                links
            }
        };
        case WREQUEST_ACTION_TYPES.setCurrentLink:{
            return {...state,current_link:payload}
        };
        case WREQUEST_ACTION_TYPES.setParams:{
            return {
                ...state,params:payload
            }
        };
        default: return state;
    }
}

export default WRequestReducer;