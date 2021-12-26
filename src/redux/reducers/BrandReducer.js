const { BRAND_ACTION_TYPES } = require("../action_types/BrandActionTypes")


const initState = {
    brands: [],
    current_link: null,
    links: [],
    params: {}
}

const BrandReducer = (state = initState, action) => {
    switch(action.type){
        case BRAND_ACTION_TYPES.setBrands:
            const {links,data} = action.payload
            return {
                ...state,
                brands:data,
                links
            };
        case BRAND_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        case BRAND_ACTION_TYPES.setBrandParams:
            return {
                ...state,
                params: action.payload
            };
        default: return state;
    }

}

export default BrandReducer;