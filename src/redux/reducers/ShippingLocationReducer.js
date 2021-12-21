const { SHIPPING_LOCATION_TYPES } = require("../action_types/ShippingLocationActionTypes")

const initState = {
    shipping_locations:[],
    current_link:null,
    links:[]
}

const ShippingLocationReducer = (state = initState, action) => {
    switch(action.type){
        case SHIPPING_LOCATION_TYPES.setShippingLocations:
            const payload = action.payload;
            return {
                ...state,
                shipping_locations:payload.data,
                links:payload.links
            };
        case SHIPPING_LOCATION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            };
        default: return state;
    }
}

export default ShippingLocationReducer;