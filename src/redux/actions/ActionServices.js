import axios from "axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { useCustomLoader } from "./AppActions";


export const getService = (url,options = {}) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,options?.iloader ?? null));
            const result = await axios.get(url,{params:options.params ?? {}});
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(result.data?.status === "success"){
                if(options?.onComplete) options.onComplete(result.data.data);
            } else{
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            console.log(ex);
        }
    }
}

export const postService = (url,data = {},options = {}) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,options?.iloader ?? null));
            const result = await axios.post(url,data,{params:options?.params ?? {}});
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(result.data?.status === "success"){
                if(typeof options?.silent === "undefined" || options?.silent === null || options?.silent === false){
                    toast.success(result.data.message);
                } 
                if(options?.onComplete) options.onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(options?.onError) options?.onError(ex);
            console.log(ex);

        }
    }
}

export const deleteService = (url,options = {}) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,options?.iloader ?? null));
            const result = await axios.delete(url,{params:options?.params ?? {}});
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(result.data?.status === "success"){
                if(typeof options?.silent === "undefined" || options?.silent === null || options?.silent === false){
                    toast.success(result.data.message);
                }                 
                if(options?.onComplete) options.onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(options?.onError) options?.onError(ex);
            console.log(ex);

        }
    }
}

export const putService = (url,data = {},options = {}) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,options?.iloader ?? null));
            const result = await axios.put(url,data,{params:options?.params ?? {}});
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(result.data?.status === "success"){
                if(typeof options?.silent === "undefined" || options?.silent === null || options?.silent === false){
                    toast.success(result.data.message);
                } 
                if(options?.onComplete) options.onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(options?.onError) options?.onError(ex);
            console.log(ex);

        }
    }
}

export const patchService = (url,data = {},options = {}) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,options?.iloader ?? null));
            const result = await axios.patch(url,data,{params:options?.params ?? {}});
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(result.data?.status === "success"){
                if(typeof options?.silent === "undefined" || options?.silent === null || options?.silent === false){
                    toast.success(result.data.message);
                } 
                if(options?.onComplete) options.onComplete(result.data.data);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,options?.iloader ?? null));
            if(options?.onError) options?.onError(ex);
            console.log(ex);
        }
    }
}

