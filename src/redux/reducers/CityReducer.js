const { CITY_ACTION_TYPES } = require("../action_types/CityActionTypes")


const initState = {
    cities: [],
    params: {},
    links: [],
    current_link: null
}

const CityReducer = (state = initState, action) => {
    switch(action.type){
        case CITY_ACTION_TYPES.setCities:{
            return {...state,cities:action.payload};
        }
        case CITY_ACTION_TYPES.setPaginatedCities:{
            const {data,links} = action.payload;
            return {...state,cities:data,links};
        };
        case CITY_ACTION_TYPES.setCurrentLink:{
            return {...state,current_link:action.payload};
        };
        case CITY_ACTION_TYPES.setParams:{
            return {...state,params:action.payload}
        }
        default: return state;
    }
}

export default CityReducer;