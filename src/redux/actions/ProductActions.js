import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { resourceStatus } from "src/config/helpers/resource_helpers"
import { PRODUCT_ACTION_TYPES } from "../action_types/ProductActionTypes"
import { setLoading } from "./AppActions"
import { setWholeCurrentProduct } from "./CurrentProductActions"

export const setProducts = (data) => {
    return {
        type:PRODUCT_ACTION_TYPES.setProducts,
        payload:data
    }
}

export const setCurrentLink = (link) => {
    return {
        type:PRODUCT_ACTION_TYPES.setCurrentLink,
        payload:link
    }
}

export const setCurrentParams = (params) => {
    return {
        type:PRODUCT_ACTION_TYPES.setCurrentParams,
        payload:params
    }
}

export const fetchProductDetails = (product_slug,iloading = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            iloading? iloading(true): dispatch(setLoading(true));
            let result = await axios.get(`${BASE_URL}product/${product_slug}`);
            iloading? iloading(false): dispatch(setLoading(false));
            if(result.data?.status === "success"){
                console.log(result.data.data);
                dispatch(setWholeCurrentProduct(result.data.data,onComplete));
            
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            iloading? iloading(false): dispatch(setLoading(false));
            handleAxiosError(ex);
        }
    }
}

export const fetchProducts = (url = null,inputparams = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            const defaultParams = state.product.params ?? {status:resourceStatus.active};
            const params = inputparams ?? defaultParams;
            params.store_id = state.store.current_store?.id;
            const result = await axios.get(url ?? `${BASE_URL}store/products`,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setProducts(result.data.data));
                dispatch(setCurrentLink(url ?? `${BASE_URL}store/products`));
                dispatch(setCurrentParams(params));
            } else {
                toast.error(result.data?.message ?? "An Error Occurred")
            }
        } 
        catch(ex){
            dispatch(setLoading(false));
            handleAxiosError(ex);
        }

    }
}

export const deleteProduct = (product_id,iloading = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            iloading? iloading(true): dispatch(setLoading(true));
            const result = await axios.delete(`${BASE_URL}product/${product_id}`);
            iloading? iloading(false): dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data.message ?? "Product Deleted Successfully");
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            iloading? iloading(false): dispatch(setLoading(false));
        }
    }
}