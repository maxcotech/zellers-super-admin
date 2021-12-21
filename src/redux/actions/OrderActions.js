import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { ORDER_ACTION_TYPES } from "../action_types/OrderActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";

export const setStoreOrders = (data) => {
    return {
        type:ORDER_ACTION_TYPES.setStoreOrders,
        payload:data
    }
}

export const setCurrentLink = (data) => {
    return {
        type:ORDER_ACTION_TYPES.setCurrentLink,
        payload:data
    }
}

export const setRequestParams = (data) => {
    return {
        type:ORDER_ACTION_TYPES.setCurrentParams,
        payload:data
    }
}

export const fetchOrders = (url = null,iparams = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            const path = url ?? state.order.current_link ?? `${BASE_URL}sub_orders`;
            const params = iparams ?? state.order.params;
            const result = await axios.get(path,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setStoreOrders(result.data.data));
                dispatch(setCurrentLink(path));
                dispatch(setRequestParams(params));
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

export const completeWithOrderItems = (params,onComplete,iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.get(`${BASE_URL}order_items`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                onComplete(result.data.data);
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

export const changeOrderStatus = (data,onComplete = null,iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.put(`${BASE_URL}sub_order/status`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchOrders());
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader))
        }
    }
}