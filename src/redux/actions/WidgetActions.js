import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { WIDGET_ACTION_TYPES } from "../action_types/WidgetActionTypes";
import { setLoading, useCustomLoader } from "./AppActions";


export const defaultWidgetsUrl = `${BASE_URL}widgets`;
export const setWidgets = (payload) => {
    return {
        type: WIDGET_ACTION_TYPES.setWidgets,
        payload
    }
}
export const setCurrentLink = (payload) => {
    return {
        type:WIDGET_ACTION_TYPES.setCurrentLink,
        payload
    }
}
export const setCurrentParams = (payload) => {
    return {
        type:WIDGET_ACTION_TYPES.setParams,
        payload
    }
}
export const setCurrentWidget = (payload) => {
    return {
        type:WIDGET_ACTION_TYPES.setCurrentWidget,
        payload
    }
}

export const setCurrentWidgetItems = (payload) => {
    return {
        type:WIDGET_ACTION_TYPES.setCurrentWidgetItems,
        payload
    }
}

export const incrementItemsLength = () => {
    return (dispatch,getState) => {
        const state = getState();
        const items = state.widget.current_widget.items;
        items.push({
            id:null,
            item_title:"",
            item_image_url:null,
            item_link:""
        });
        dispatch(setCurrentWidgetItems(items));
    }
}

export const generateEmptyWidgetItems = (count = 1) => {
    return (dispatch) => {
        const newItems = [];
        for(let i = 0; i < count; i++){
            newItems.push({
                id:null,
                item_title:"",
                item_image_url:null,
                item_link:""
            })
        }
        dispatch(setCurrentWidgetItems(newItems));
    }
}

export const setWidgetItemValue = (value,key,itemIndex) => {
    return (dispatch,getState) => {
        const state = getState();
        const currentItems = state.widget.current_widget.items;
        const newCurrentItems = currentItems.map((item,index) => {
            if(index === itemIndex){
                return {
                    ...item,
                    [key]:value
                }
            }
            return item;
        });
        dispatch(setCurrentWidgetItems(newCurrentItems));
    }
}

export const setWidgetItemRow = (row,itemIndex) => {
    const keys = Object.keys(row);
    const filteredRow = {};
    keys.forEach((key) => {
        if(row[key] !== null && row[key] !== ""){
            filteredRow[key] = row[key];
        }
    });
    return (dispatch,getState) => {
        const state = getState();
        const currentItems = state.widget.current_widget.items;
        const newCurrentItems = currentItems.map((item,index) => {
            if(index === itemIndex){
                return {...item,...filteredRow};
            }
            return item;
        });
        dispatch(setCurrentWidgetItems(newCurrentItems))
    }
}

export const uploadWidget = (data, iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.post(`${BASE_URL}widget`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                toast.success(result.data.message);
                if(onComplete) onComplete(result.data.data)
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

export const uploadWidgetImage = (file,itemIndex,iloader = null,onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const formData = new FormData();
            const state = getState();
            const currentWidget = state.widget.current_widget;
            const currentItem = currentWidget.items[itemIndex];
            if(currentItem.id !== null) formData.append('id',currentItem.id);
            if(currentWidget.id == null || typeof currentWidget.id === "undefined"){
                throw new Error("A widget is required inorder to upload widget images");
            }
            formData.append('widget_id',currentWidget.id);
            formData.append('image_file',file);
            const result = await axios.post(`${BASE_URL}widget/image`,formData);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(setWidgetItemRow(result.data.data,itemIndex))
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

export const uploadWidgetItems = (iloader = null,onComplete = null) => {
    return async (dispatch,getState) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const state = getState();
            const items = state.widget.current_widget.items;
            const data = {
                id:state.widget.current_widget.id,
                widget_items:JSON.stringify(items)
            }
            const result = await axios.post(`${BASE_URL}widget/items`,data);
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
            dispatch(useCustomLoader(false,iloader))
        }
    }
}

export const fetchWidgetItems = (params = {},iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.get(`${BASE_URL}widget/items`,{params});
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                dispatch(setCurrentWidgetItems(result.data.data));
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

export const fetchWidgets = (url = null, params = {},onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const currentPath = url ?? defaultWidgetsUrl;
            const result = await axios.get(currentPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setWidgets(result.data.data));
                dispatch(setCurrentLink(currentPath));
                dispatch(setCurrentParams(params));
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

export const updateWidgetStatus = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}widget/status`,data);
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

export const swapWidgetIndex = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.patch(`${BASE_URL}widget/index`,data);
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

export const deleteWidget = (widget_id,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.delete(`${BASE_URL}widget/${widget_id}`);
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