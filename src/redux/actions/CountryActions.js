import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { COUNTRY_ACTION_TYPES } from "../action_types/CountryActionTypes"
import { deleteService, postService, putService } from "./ActionServices"
import { setLoading, useCustomLoader } from "./AppActions"

export const defaultCountriesUrl = `${BASE_URL}countries`;
export const setCountries = (countries) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCountries,
        payload:countries
    }
}

export const setPaginatedCountries = (payload) => {
    return {
        type:COUNTRY_ACTION_TYPES.setPaginatedCountries,
        payload
    }
}

export const setCountriesParams = (payload) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCountriesParams,
        payload
    }
}

export const setCurrentCountriesLink = (payload) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCurrentCountriesLink,
        payload
    }
}

export const setCurrencies = (currencies) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCurrencies,
        payload:currencies
    }
}

export const fetchCurrencies = () => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const result = await axios.get(`${BASE_URL}currencies`);
            dispatch(setLoading(false));
            if(result.data?.status == "success"){
                dispatch(setCurrencies(result.data.data));
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

export const fetchCountries = (url = null, params = {}) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        const currentPath = url ?? defaultCountriesUrl;
        axios.get(currentPath,{params})
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setCurrentCountriesLink(currentPath));
                dispatch(setCountriesParams(params));
                if(params?.paginate == 1){
                    dispatch(setPaginatedCountries(result.data.data));
                } else {
                    dispatch(setCountries(result.data.data))
                }
            } else {
                toast.error(result.data?.message ?? "An Error occurred");
            }
        })
        .catch((ex) => {
            dispatch(setLoading(false));
            handleAxiosError(ex);
        })
    }
}

export const createCountry = (data,iloader = null, onComplete = null) => {
    return async (dispatch) => {
       const options = {iloader,onComplete};
       dispatch(postService(`${BASE_URL}country`,data,options))
    }
}

export const updateCountry = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        dispatch(putService(`${BASE_URL}country`,data,{iloader,onComplete}))
    }
}

export const deleteCountry = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        dispatch(deleteService(`${BASE_URL}country/${data}`,{iloader,onComplete}))
    }
}

export const uploadCountryLogo = (data,iloader = null,onComplete = null) => {
    return async (dispatch) => {
        dispatch(postService(
            `${BASE_URL}country/upload_logo`,data,
            {iloader,onComplete,silent:true}
        ))
    }
}