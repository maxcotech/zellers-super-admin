import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "src/config/constants/app_constants";
import { handleAxiosError } from "src/config/helpers/http_helpers";
import { DASHBOARD_ACTION_TYPES } from "../action_types/DashboardActionTypes";
import { setLoading } from "./AppActions";


export const defaultDashboardUrl = `${BASE_URL}admin/dashboard`;

export const setOrders = (payload) => {
    return {
        type:DASHBOARD_ACTION_TYPES.setOrders,
        payload
    }
}

export const setParams = (payload) => {
    return {
        type:DASHBOARD_ACTION_TYPES.setParams,
        payload
    }
}
export const setCurrentLink = (payload) => {
    return {
        type:DASHBOARD_ACTION_TYPES.setCurrentLink,
        payload
    }
}

export const fetchDashboardData = (url = null,params = {}, onComplete = null) => {
    return async (dispatch) => {
        try{
            dispatch(setLoading(true));
            const currentPath = url ?? defaultDashboardUrl;
            const result = await axios.get(currentPath,{params});
            dispatch(setLoading(false));
            if(result.data?.status === "success"){
                dispatch(setOrders(result.data.data));
                dispatch(setParams(params));
                dispatch(setCurrentLink(currentPath));
                if(onComplete) onComplete();
            } else {
                toast.error(result.data?.message ?? "An Error Occurred");
            }
        }
        catch(ex){
            handleAxiosError(ex);
            dispatch(setLoading(false));
        }
    }
}