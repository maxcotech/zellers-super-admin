import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { STAFF_ACTION_TYPES } from "../action_types/StaffActionTypes"
import { setLoading, useCustomLoader } from "./AppActions"

export const setStoreStaffs = (data) => {
    return {
        type:STAFF_ACTION_TYPES.setStoreStaffs,
        payload:data
    }
}

export const setCurrentLink = (link) => {
    return {
        type:STAFF_ACTION_TYPES.setCurrentLink,
        payload:link
    }
}

export const setFilters = (filters) => {
    return {
        type:STAFF_ACTION_TYPES.setFilters,
        payload:filters
    }
}

export const fetchStoreStaffs = (url = null) => {
    return async (dispatch,getState) => {
       try{
            dispatch(setLoading(true));
            const state = getState();
            const restPath = url ?? `${BASE_URL}store/staffs`;
            const params = state.store_staff.filters;
            params.store_id = state.store.current_store?.id;
            const result = await axios.get(restPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setStoreStaffs(result.data.data));
                dispatch(setCurrentLink(restPath))
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
       }
       catch (ex){
           dispatch(setLoading(false));
           handleAxiosError(ex);
       }
    }
}


export const changeStaffPosition = (data,iloading = null) => {
    return async (dispatch,getState) => {
        try{
            iloading? iloading(true):dispatch(setLoading(true));
            const state = getState();
            data.store_id = state.store.current_store?.id;
            const result = await axios.put(`${BASE_URL}store/staff/position`,data);
            iloading? iloading(false):dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(fetchStoreStaffs(state.store_staff.current_link));
                toast.success(result.data.message);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch (ex){
            handleAxiosError(ex);
            iloading? iloading(false):dispatch(setLoading(false))
        }

    }
}

export const toggleStaffStatus = (staffId,iloading = null) => {
    return async (dispatch,getState) => {
        try{
            const state = getState();
            const data = {store_id:state.store.current_store?.id};
            dispatch(useCustomLoader(true,iloading));
            const result = await axios.patch(`${BASE_URL}store/staff/${staffId}/toggle_status`,data);
            dispatch(useCustomLoader(false,iloading));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchStoreStaffs(state.store_staff.current_link))
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloading));
        }
    }
}

export const removeStoreStaff = (staffId,iloader = null) => {
    return async (dispatch,getState) => {
        try{
            const state = getState();
            const params = {store_id:state.store.current_store?.id};
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}store/staff/${staffId}`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                dispatch(fetchStoreStaffs(state.store_staff.current_link));
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