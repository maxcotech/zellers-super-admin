import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers"
import { useCustomLoader } from "./AppActions";

export const completeWithInitPaymentData = (onComplete = null, iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.post(`${BASE_URL}payment/init`);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status === "success"){
                if(onComplete) onComplete(result.data.data);
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

export const completeWithPaymentVerification = (data,onComplete = null,iloader = null) => {
    return async (dispatch) => {
        try{
            dispatch(useCustomLoader(true,iloader));
            const result = await axios.put(`${BASE_URL}payment/verify`,data);
            dispatch(useCustomLoader(false,iloader));
            if(result.data?.status == "success"){
                if(onComplete) onComplete(result.data.data);
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