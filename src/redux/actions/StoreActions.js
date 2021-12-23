import axios from "axios"
import { toast } from "react-toastify"
import { UserRoles } from "src/config/app_config/user_config"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { STORE_ACTION_TYPES } from "../action_types/StoreActionTypes"
import { setLoading, useCustomLoader } from "./AppActions"
import { fetchUser } from "./AuthActions"

export const setStores = (payload) => {
    return {
        type:STORE_ACTION_TYPES.setStores,
        payload:payload
    }
}

export const setCurrentLink = (payload) => {
    return {
        type:STORE_ACTION_TYPES.setCurrentLink,
        payload
    }
}

export const fetchStores = (url = null, params = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            const currentPath = url ?? state.store.current_link ?? `${BASE_URL}stores`;
            const result = await axios.get(currentPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setStores(result.data.data));
                dispatch(setCurrentLink(currentPath))
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(setLoading(false));
        }
    }
}

export const updateStoreStatus = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}store/status`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message)
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

export const deleteStore = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}store/${data}`);
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