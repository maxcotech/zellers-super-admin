import axios from "axios"
import { toast } from "react-toastify"
import { UserRoles } from "src/config/app_config/user_config"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { STORE_ACTION_TYPES } from "../action_types/StoreActionTypes"
import { setLoading, useCustomLoader } from "./AppActions"
import { fetchUser } from "./AuthActions"

export const setStore = (payload) => {
    return {
        type:STORE_ACTION_TYPES.setStore,
        payload:payload
    }
}

export const searchStores = (query,onComplete) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}store/search`,{
            params:{
                query:query
            }
        })
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error occurred.");
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}

export const setCurrentStore = (payload,onComplete = null) => {
    return (dispatch,getState) => {
        const state = getState();
        dispatch({
            type:STORE_ACTION_TYPES.setCurrentStoreData,
            payload:payload
        })
        if(state.auth.user !== null){
            if(state.auth.user?.user_type == UserRoles.storeStaff){
                dispatch(fetchStaffType(onComplete,payload.id))
            }
        }
    }
}

export const setStoreStaffType = (payload) => {
    return {
        type:STORE_ACTION_TYPES.setStaffType,
        payload:payload
    }
}

export const fetchStaffType = (onComplete = null,storeIdParam = null) => {
    return (dispatch,getState) => {
        const state = getState();
        const storeId = storeIdParam ?? state.store.current_store?.id;
        if(storeId !== null){
            dispatch(setLoading(true));
            axios.get(`${BASE_URL}store/staff/type`,{
                params:{store:storeId}
            })
            .then((result) => {
                dispatch(setLoading(false));
                if(result.data?.status == "success"){
                    dispatch(setStoreStaffType(result.data.data))
                    if(onComplete) onComplete();
                } else {
                    toast.error(result.data?.message ?? "An Error Occurred.")
                }
            })
            .catch((ex) => {
                dispatch(setLoading(false));
                handleAxiosError(ex)
            })
        }
    }
}

export const joinStore = (data,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        axios.post(`${BASE_URL}store/add_user`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An error occurred.");
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}




export const createStoreAction = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${BASE_URL}store`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(fetchUser());
                toast.success('Store was created successfully.');
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.")
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}

export const updateStore = (data,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const result = await axios.put(`${BASE_URL}store`,data);
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchUser(onComplete));
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(setLoading(false))
        }
    }
}

export const uploadStoreLogo = (file,store_id,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const formData = new FormData();
            formData.append('store_logo',file);
            formData.append('store_id',store_id);
            const result = await axios.post(`${BASE_URL}store/logo`,formData);
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

export const completeWithStates = (country_id,onComplete = null,iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const params = {country_id};
            const result = await axios.get(`${BASE_URL}states`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                if(onComplete) onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            dispatch(useCustomLoader(false,iloader));
            handleAxiosError(ex);
        }
    }
}

export const completeWithCities = (country_id,state,onComplete = null,iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const params = {country_id,state};
            const result = await axios.get(`${BASE_URL}cities`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                if(onComplete) onComplete(result.data.data);
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