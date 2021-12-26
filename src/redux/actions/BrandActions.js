import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { BRAND_ACTION_TYPES } from "../action_types/BrandActionTypes";
import { setLoading, useCustomLoader } from "./AppActions"

export const defaultBrandsUrl = `${BASE_URL}brands`;

export const setBrands = (data) => {
    return {
        type:BRAND_ACTION_TYPES.setBrands,
        payload:data
    }
}
export const setCurrentLink = (current_link) => {
    return {
        type:BRAND_ACTION_TYPES.setCurrentLink,
        payload:current_link
    }
}
export const setBrandParams = (payload) => {
    return {
        type:BRAND_ACTION_TYPES.setBrandParams,
        payload
    }
}

export const createBrand = (data,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${BASE_URL}brand`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete();
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })

    }
}

export const fetchBrands = (url = null, params = {}, onComplete = null) => {
    return (dispatch,getState) => {
        dispatch(setLoading(true));
        const state = getState();
        const {current_link} = state.brand;
        const currentPath = url ?? current_link ?? defaultBrandsUrl;
        axios.get(currentPath,{params})
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data.status === "success"){
                dispatch(setBrands(result.data.data));
                dispatch(setCurrentLink(currentPath));
                dispatch(setBrandParams(params));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.")
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}

export const uploadBrandLogo = (data,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.post(`${BASE_URL}brand/logo`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}

export const updateBrand = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.put(`${BASE_URL}brand`,data);
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

export const updateBrandStatus = (data,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}brand/status`,data);
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

export const deleteBrand = (id,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}brand/${id}`);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data?.message);
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