const { APP_ACTION_TYPES } = require("../action_types/AppActionTypes")


const initState = {
    loading:false,
    sidebar:"responsive"
}

const AppReducer = (state = initState,action) => {
    switch(action.type){
        case APP_ACTION_TYPES.setLoading:
            return {...state,loading:action.payload};
        case APP_ACTION_TYPES.setSideBarStatus:
            return {...state,sidebar:action.payload};
        default: return state;
    }
}

export default AppReducer;