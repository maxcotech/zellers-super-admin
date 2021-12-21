import {setLoading} from "./AppActions";
import {BASE_URL} from "../../config/constants/app_constants";
import {VARIATION_OPTION_TYPES} from "../action_types/VariationOptionTypes";
import { toast } from "react-toastify";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import axios from "axios";

export const setOptionsVariation = (data) => {
    return {
        type:VARIATION_OPTION_TYPES.setVariationOptions,
        payload:data
    }
}

export const getOptionNameById = (id,options) => {
    let name = "";
    if(typeof options === "undefined" || options === null || options?.length === 0) return "";
    options.forEach((item) => {
        if(item.id === id){
            name = item.option;
        }
    });
    return name;
}

export const fetchVariationOptions = () => {
    
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${BASE_URL}variation_options`)
        .then((result) => {
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setOptionsVariation(result.data.data))
            } else {
                toast.error(result.data?.message ?? "An Error Occurred.")
            }
        })
        .catch((ex) => {
            handleAxiosError(ex);
            dispatch(setLoading(false));
        })
    }
}