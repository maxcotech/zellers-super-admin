import { PRODUCT_ACTION_TYPES } from "../action_types/ProductActionTypes";

const initState = {
    products:[],
    links:[],
    current_link:null,
    params:null

}

const ProductReducer = (state = initState, action) => {
    switch(action.type){
        case PRODUCT_ACTION_TYPES.setProducts:
            const payload = action.payload;
            return {
                ...state,
                products:payload.data,
                links:payload.links
            };
        case PRODUCT_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        case PRODUCT_ACTION_TYPES.setCurrentParams:
            return {
                ...state,
                params:action.payload
            };
        default: return state;

    }
}

export default ProductReducer;