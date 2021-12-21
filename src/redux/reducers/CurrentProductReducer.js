const { CURRENT_PRODUCT_TYPE } = require("../action_types/CurrentProductType")

const initState = {
    id:null,
    product_name:null,
    regular_price:null,
    sales_price:null,
    simple_description:null,
    description:null,
    amount_in_stock:null,
    category_id:null,
    product_image:null,
    brand_id:null,
    weight:null,
    front_image:null,
    back_image:null,
    side_image:null,
    fourth_image:null,
    fifth_image:null,
    key_features:null,
    dimension_height:null,
    dimension_width:null,
    dimension_length:null,
    youtube_video_id:null,
    variations:[],
    category_title:null,
    brand_name:null
}

const CurrentProductReducer = (state = initState, action) => {
    switch(action.type){
        case CURRENT_PRODUCT_TYPE.setCurrentProduct:
            return {...state,...action.payload};
        case CURRENT_PRODUCT_TYPE.setCurrentProductVariations:
            return {...state,variations:action.payload};
        case CURRENT_PRODUCT_TYPE.updateVariationOption:
            return { ...state };
        case CURRENT_PRODUCT_TYPE.reset:
            return {...initState};
        default: return state;
    }
}

export default CurrentProductReducer;