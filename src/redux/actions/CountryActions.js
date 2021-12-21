import axios from "axios"
import { toast } from "react-toastify"
import { BASE_URL } from "src/config/constants/app_constants"
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { COUNTRY_ACTION_TYPES } from "../action_types/CountryActionTypes"
import { setLoading } from "./AppActions"

export const setCountries = (countries) => {
    return {
        type:COUNTRY_ACTION_TYPES.setCountries,
        payload:countries
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

export const fetchCountries = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}countries`)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setCountries(result.data.data))
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