import { BASE_URL } from "src/config/constants/app_constants";
import { CITY_ACTION_TYPES } from "../action_types/CityActionTypes";
import { deleteService, getService, patchService, postService, putService } from "./ActionServices";


export const defaultCityUrl = `${BASE_URL}cities`;
export const defaultPaginatedCityUrl = `${BASE_URL}cities/paginate`;
export const setPaginatedCities = (payload) => ({type:CITY_ACTION_TYPES.setPaginatedCities,payload});
export const setCurrentLink = (payload) => ({type:CITY_ACTION_TYPES.setCurrentLink,payload});
export const setParams = (payload) => ({type:CITY_ACTION_TYPES.setParams,payload});
export const fetchPaginatedCities = (url = null,params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultPaginatedCityUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setPaginatedCities(data));
            dispatch(setCurrentLink(currentPath));
            dispatch(setParams(params));
            if(onComplete) onComplete(data);
        }}))
    }
}

export const createCity = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}city`,data,{iloader,onComplete}))
    }
}

export const updateCityStatus = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(patchService(`${BASE_URL}city/status`,data,{iloader,onComplete}))
    }
}

export const updateCity = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(putService(`${BASE_URL}city`,data,{iloader,onComplete}))
    }
}

export const deleteCity = (city_id,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(deleteService(`${BASE_URL}city/${city_id}`,{iloader,onComplete}))
    }
}