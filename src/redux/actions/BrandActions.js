import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { setLoading } from "./AppActions"

export const createBrand = (data,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.post(`${BASE_URL}brand`,data)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                toast.success('Your brand proposal was submitted for approval');
                if(onComplete) onComplete();
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })

    }
}

export const searchBrands = (query,onComplete = null) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}search/brands`,{
            params:{
                query:query
            }
        })
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data.status === "success"){
                if(onComplete) onComplete(result.data.data);
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}