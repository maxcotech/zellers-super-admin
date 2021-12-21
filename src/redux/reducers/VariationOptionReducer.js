import { VARIATION_OPTION_TYPES } from "../action_types/VariationOptionTypes";

const initState = {
    options:[]
}

const VariationOptionReducer = (state = initState,action) => {
    switch(action.type){
        case VARIATION_OPTION_TYPES.setVariationOptions:
            return {...state,options:action.payload};
        default:return state;
    }
}

export default VariationOptionReducer;