import { STATES_ACTION_TYPES } from "../action_types/StatesActionTypes";

const initState = {
    states:[],
    links:[],
    current_link:null,
    params:{}
}

const StateReducer = (state = initState,action) => {
    switch(action.type){
        case STATES_ACTION_TYPES.setStates:{
            return {...state,states:action.payload};
        };
        case STATES_ACTION_TYPES.setPaginatedStates:{
            const {links,data} = action.payload;
            return {...state,states:data,links};
        };
        case STATES_ACTION_TYPES.setParams:{
            return {...state,params:{...state.params,...action.payload}};
        };
        case STATES_ACTION_TYPES.setCurrentLink:
            return {...state,current_link:action.payload};
        default: return state;
    }
}

export default StateReducer;