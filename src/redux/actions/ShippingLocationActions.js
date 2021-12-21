import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { SHIPPING_LOCATION_TYPES } from "../action_types/ShippingLocationActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";

export const setShippingLocations = (data) => {
    return {
        type:SHIPPING_LOCATION_TYPES.setShippingLocations,
        payload:data
    }
}

export const setCurrentLink = (link) => {
    return {
        type:SHIPPING_LOCATION_TYPES.setCurrentLink,
        payload:link
    }
}

export const fetchShippingLocations = (params, url = null ,iloader = null, onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            const state = getState();
            const {current_link} = state.shipping_location;
            const store_id = state.store.current_store?.id;
            params.store_id = store_id;
            const restPath = url ?? current_link ?? `${BASE_URL}shipping/locations`;
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.get(restPath,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(setShippingLocations(result.data.data));
                dispatch(setCurrentLink(restPath));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader))
        }
    }
}

export const createShippingLocations = (data,onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            data.store_id = state.store.current_store?.id;
            const result = await axios.post(`${BASE_URL}shipping/location`,data);
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(fetchShippingLocations(
                    {shipping_group_id:data.shipping_group_id},
                    null,null,onComplete
                ));
                toast.success(result.data.message);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(setLoading(false));
        }
    }
}

export const updateShippingLocation = (data,onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            const refreshData = {shipping_group_id:data.shipping_group_id};
            data.store_id = state.store.current_store?.id;
            const result = await axios.put(`${BASE_URL}shipping/location`,data);
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchShippingLocations(refreshData,null,null,onComplete));
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.")
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(setLoading(false));
        }
    }
}

export const deleteShippingLocation = (id,shipping_group_id,iloader = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const state = getState();
            const params = {store_id:state.store.current_store?.id};
            const result = await axios.delete(`${BASE_URL}shipping/location/${id}`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchShippingLocations({shipping_group_id}))
            } else {
                toast.error(result.data?.message ?? "An Error occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader))
        }
    }
}