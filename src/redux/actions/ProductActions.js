import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { resourceStatus } from "src/config/helpers/resource_helpers"
import { PRODUCT_ACTION_TYPES } from "../action_types/ProductActionTypes"
import { setLoading, useCustomLoader } from "./AppActions"

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

export const setProductFilters = (filters) => {
    return {
        type:PRODUCT_ACTION_TYPES.setProductFilters,
        payload:filters
    }
}

export const setProductDetails = (details) => {
    return {
        type:PRODUCT_ACTION_TYPES.setProductDetails,
        payload:details
    }
}
 
export const fetchProductDetails = (product_slug,iloading = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            console.log(product_slug);
            iloading? iloading(true): dispatch(setLoading(true));
            let result = await axios.get(`${BASE_URL}product/${product_slug}`);
            iloading? iloading(false): dispatch(setLoading(false));
            if(result.data?.status === "success"){
                console.log(result.data.data);
                dispatch(setProductDetails(result.data.data));
                if(onComplete) onComplete();
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

export const defaultCategoryProductUrl = `${BASE_URL}category/products/`

export const fetchCategoryProducts = (url = null,iparams = null,iloader = null, onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const state = getState();
            const {current_link} = state.product;
            const defaultParams = state.product.params ?? {status:resourceStatus.active};
            const params = iparams ?? defaultParams;
            const currentPath = url ?? current_link;
            const result = await axios.get(currentPath,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(setProducts(result.data.data));
                dispatch(setProductFilters(result.data.data.filters));
                dispatch(setCurrentLink(currentPath));
                dispatch(setCurrentParams(params));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            dispatch(useCustomLoader(false,iloader));
            handleAxiosError(ex);
        }
    }
}
export const defaultCatalogUrl = `${BASE_URL}catalog`;
export const fetchProducts = (url = null,inputparams = null,onComplete = null,iloader = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const state = getState();
            const defaultParams = state.product.params ?? {status:resourceStatus.active};
            const params = inputparams ?? defaultParams;
            const result = await axios.get(url ?? defaultCatalogUrl,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(setProducts(result.data.data));
                dispatch(setProductFilters(result.data.data.filters));
                dispatch(setCurrentLink(url ?? `${BASE_URL}catalog`));
                dispatch(setCurrentParams(params));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred")
            }
        } 
        catch(ex){
            dispatch(useCustomLoader(false,iloader));
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

export const updateProductStatus = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}product/status`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}

