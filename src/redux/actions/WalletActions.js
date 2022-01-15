import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { WALLET_ACTION_TYPES } from "../action_types/WalletActionTypes";
import { setLoading } from "./AppActions";

export const defaultWalletUrl = `${BASE_URL}admin/wallet`;

export const setWalletData = (data) => {
    return {
        type:WALLET_ACTION_TYPES.setWalletData,
        payload:data
    }
}

export const setCurrentLink = (payload) => {
    return {
        type:WALLET_ACTION_TYPES.setCurrentLink,
        payload
    }
}

export const setParams = (params) => {
    return {
        type:WALLET_ACTION_TYPES.setParams,
        payload:params
    }
}

export const fetchWallet = (url = null,params = {},onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const currentPath = url ?? defaultWalletUrl;
            const result = await axios.get(currentPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setWalletData(result.data.data));
                dispatch(setCurrentLink(currentPath));
                dispatch(setParams(params));
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