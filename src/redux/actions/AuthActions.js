import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { handleArrayMessage } from "src/config/helpers/message_helpers";
import Swal from "sweetalert2";
import { AUTH_ACTION_TYPES } from "../action_types/AuthActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";
import { setStore } from "./StoreActions";

export const setUserData = (data,dispatch) => {
    return new Promise((resolve,reject) => {
        dispatch({
            type:AUTH_ACTION_TYPES.setUserData,
            payload:data
        });
        dispatch(setStore({
            current_store:data.current_store ?? null,
            stores:data.stores ?? []
        }))
        
        resolve();
    })
}

export const registerUser = (data,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${BASE_URL}user/register`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                Swal.fire({
                    title: 'Great !!!',
                    icon: 'success',
                    text:"Your registration Process was successful, proceed to login.",
                    showCancelButton: true,
                    confirmButtonText: 'Sign In',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      if(onComplete) onComplete();
                    } 
                  })
            } else {
                (result.data?.message)?
                handleArrayMessage(result.data?.message,toast.error):
                toast.error('An Error Occurred.');
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}

export const fetchUser = (onComplete = null) => {
    return (dispatch) => {
        console.log('retriving user data');
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}user/profile`)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data.status == "success"){
                console.log(result.data);
                setUserData(result.data.data,dispatch)
                .then(() => {
                    if(onComplete) onComplete();
                });
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })

    }
}

export const loginUser = (data,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${BASE_URL}user/login`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status == "success"){
                toast.success("You have successfully signed in.");
                dispatch(fetchUser(() => (onComplete)? onComplete():false));
            } else {
                (result.data?.message)? 
                handleArrayMessage(result.data?.message,toast.error):
                toast.error('An Error Occurred');
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false))
            handleAxiosError(ex);

        })
    }
}

export const setLogoutUser = () => {
    return {
        type:AUTH_ACTION_TYPES.logoutUser
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        axios.delete(`${BASE_URL}user/logout`)
        .then((result) => {
            if(result.data?.status === 'success'){
                dispatch(setLogoutUser());
            } else {
                (result.data?.message)? 
                    handleArrayMessage(result.data.message,toast.error):
                    toast.error('An Error Occurred');
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
        })
    }
}

export const updateUserCurrency = (currency_id,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const params = {currency_id}
            const result = await axios.put(`${BASE_URL}user/currency`,params);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(fetchUser(onComplete));
            } else {
                toast.error(result.data?.error ?? "An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}