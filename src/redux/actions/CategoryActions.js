import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import { CATEGORY_ACTION_TYPES } from "../action_types/CategoryActionTypes";
import { useCustomLoader } from "./AppActions"

export const setCategories = (key,data,currentLink) => {
    return {
        type:CATEGORY_ACTION_TYPES.setCategories,
        payload:{
            key,
            data:{
                categories:data.data,
                links:data.links,
                current_link:currentLink
            }
        }
    }
}

export const setCurrentLink = (data) => {
    return {
        type:CATEGORY_ACTION_TYPES.setCurrentLink,
        payload:data
    }
}

export const fetchCategories = (url = null,params = {status:resourceStatus.active},level = 0,iloader = null,onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            const state = getState();
            const currentPath = url ?? state.category.current_link ?? `${BASE_URL}categories`;
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.get(currentPath,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status != null){
                dispatch(setCategories("level_"+level,result.data.data,currentPath));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            console.log(ex);
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
        
    }
}

export const uploadCategoryFile = (file,meta,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            let result = null;
            const formData = new FormData();
            formData.append('category_id',meta.id)
            if(meta.file_type === "category_icon"){
                formData.append('category_icon',file);
                result = await axios.post(`${BASE_URL}category/icon`,formData);
            } else {
                formData.append('category_image',file);
                result = await axios.post(`${BASE_URL}category/image`,formData);
            }
            dispatch(useCustomLoader(false,iloader));
            if(result !== null){
                if(result.data?.status === "success"){
                    toast.success(result.data.message);
                    if(onComplete) onComplete(result.data.data);
                } else {
                    toast.error(result.data?.message ?? "An Error Occurred");
                }
            }
        }
        catch(ex){
            handleAxiosError(ex);
            console.log(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}

export const uploadCategoryItem = (data,iloader = null, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            let result = null;
            if(data.id !== null){
                result = await axios.put(`${BASE_URL}category`,data);
            } else {
                result = await axios.post(`${BASE_URL}category`,data);
            }
            dispatch(useCustomLoader(false,iloader));
            if(result !== null){
                if(result.data?.status === "success"){
                    toast.success(result.data.message);
                    if(onComplete) onComplete();
                } else {
                    toast.error(result.data?.message ?? "An Error Occurred.");
                }
            }
        }
        catch(ex){
            console.log(ex);
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}


export const completeWithCategories = (url = null,params,iloader = null,onComplete) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const currentPath = url ?? `${BASE_URL}categories`;
            const result = await axios.get(currentPath,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                console.log(onComplete);
                onComplete(result.data.data,currentPath);
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.");
            }
        }
        catch(ex){
            console.log(ex);
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
        }
    }
}

export const updateCategoryStatus = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}category/status`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? " An Error Occurred.");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(useCustomLoader(false,iloader));
            console.log(ex);
        }
    }
}

export const deleteCategoryItem = (id,iloader,onComplete) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}category/${id}`)
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
            console.log(ex);
        }
    }
}

