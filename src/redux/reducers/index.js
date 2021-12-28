import { combineReducers } from "redux";
import { AUTH_ACTION_TYPES } from "../action_types/AuthActionTypes";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import BrandReducer from "./BrandReducer";
import CategoryReducer from "./CategoryReducer";
import CountryReducer from "./CountryReducer";
import CurrentProductReducer from "./CurrentProductReducer";
import OrderReducer from "./OrderReducer";
import ProductReducer from "./ProductReducer";
import ShippingGroupReducer from "./ShippingGroupReducer";
import ShippingLocationReducer from "./ShippingLocationReducer";
import StaffTokenReducer from "./StaffTokenReducer";
import StoreReducer from "./StoreReducer";
import StoreStaffReducer from "./StoreStaffReducer";
import UserReducer from "./UserReducer";
import VariationOptionReducer from "./VariationOptionReducer";
import WalletReducer from "./WalletReducer";

const appReducers = combineReducers({
    auth:AuthReducer,
    app:AppReducer,
    store:StoreReducer,
    country:CountryReducer,
    staff_token:StaffTokenReducer,
    current_product:CurrentProductReducer,
    category:CategoryReducer,
    variation_option:VariationOptionReducer,
    product:ProductReducer,
    store_staff:StoreStaffReducer,
    shipping_group:ShippingGroupReducer,
    shipping_location:ShippingLocationReducer,
    order:OrderReducer,
    user:UserReducer,
    brand:BrandReducer,
    wallet:WalletReducer
});

const rootReducers = (state,action) => {
    if(action.type ===  AUTH_ACTION_TYPES.logoutUser){
        return appReducers(undefined,action);
    }
    return appReducers(state,action);
}

export default rootReducers;