import { PRODUCT_ACTION_TYPES } from "../action_types/ProductActionTypes";

const initState = {
    products:[],
    links:[],
    current_link:null,
    params:{},
    product_details:null,
    filters:{}

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
                params:{...state.params,...action.payload}
            };
        case PRODUCT_ACTION_TYPES.setProductDetails:
            return {
                ...state,
                product_details:action.payload
            };
        case PRODUCT_ACTION_TYPES.setProductFilters:
            return {
                ...state,
                filters:action.payload
            }
        default: return state;

    }
}

export default ProductReducer;