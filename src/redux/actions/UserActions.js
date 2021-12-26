import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { USER_ACTION_TYPES } from "../action_types/UsersActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";


export const setUsers = (data) => {
    return {
        type:USER_ACTION_TYPES.setUsers,
        payload:data
    }
}

export const setCurrentLink = (link) => {
    return {
        type:USER_ACTION_TYPES.setCurrentLink,
        payload:link
    }
}

export const fetchUsers = (url = null, params = null, onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(setLoading(true));
            const state = getState();
            const currentPath = url ?? state.user.current_link ?? `${BASE_URL}users`;
            const result = await axios.get(currentPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setUsers(result.data.data));
                dispatch(setCurrentLink(currentPath));
                if(onComplete) onComplete();
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

export const updateUserStatus = (data,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}users/status`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete();
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

export const deleteUser = (user_id,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}user/account/${user_id}`);
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
            dispatch(useCustomLoader(false,iloader))
        }
    }
}