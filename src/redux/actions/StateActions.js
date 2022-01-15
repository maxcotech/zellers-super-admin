import { BASE_URL } from "src/config/constants/app_constants"
import { STATES_ACTION_TYPES } from "../action_types/StatesActionTypes";
import { deleteService, getService, patchService, postService, putService } from "./ActionServices";

export const defaultStateUrl = `${BASE_URL}states`;
export const defaultPaginatedStateUrl = `${BASE_URL}states/paginate`;
export const setPaginatedStates = (payload) => ({type:STATES_ACTION_TYPES.setPaginatedStates,payload})
export const setParams = (payload) => ({type:STATES_ACTION_TYPES.setParams,payload});
export const setCurrentLink = (payload) => ({type:STATES_ACTION_TYPES.setCurrentLink,payload});

export const fetchPaginatedStates = (url = null,params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultPaginatedStateUrl;
        dispatch(getService(currentPath,{
            iloader,params,onComplete:(data) => {
                dispatch(setPaginatedStates(data));
                dispatch(setParams(params));
                dispatch(setCurrentLink(currentPath));
                if(onComplete) onComplete(data);
            }
        }))
    }
}

export const createState = (data, iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}state`,data,{iloader,onComplete}));
    }
}

export const updateState = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(putService(`${BASE_URL}state`,data,{iloader,onComplete}));
    }
}

export const updateStateStatus = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(patchService(`${BASE_URL}state/status`,data,{iloader,onComplete}))
    }
}

export const deleteState = (state,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(deleteService(`${BASE_URL}state/${state}`,{iloader,onComplete}))
    }
}