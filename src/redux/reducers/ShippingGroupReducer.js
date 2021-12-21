const { SHIPPING_GROUP_TYPES } = require("../action_types/ShippingGroupTypes")

const initState = {
    shipping_groups:[],
    current_link:null,
    links:[]
}

const ShippingGroupReducer = (state = initState, action) => {
    switch(action.type){
        case SHIPPING_GROUP_TYPES.setShippingGroups:
            const payload = action.payload;
            return {
                ...state,
                shipping_groups:payload.data,
                links:payload.links
            };
        case SHIPPING_GROUP_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload
            }
        default: return state;
    }
}

export default ShippingGroupReducer;