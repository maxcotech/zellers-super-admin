import { APP_ACTION_TYPES } from "../action_types/AppActionTypes"

export const setLoading = (val) => {
    return {
        type:APP_ACTION_TYPES.setLoading,
        payload:val
    }
}

export const setSideBarStatus = (data) => {
    return {
        type:APP_ACTION_TYPES.setSideBarStatus,
        payload:data
    }
}

export const useCustomLoader = (value,customLoader) => {
    return (dispatch) => {
        if(customLoader){
            customLoader(value);
        } else {
            dispatch(setLoading(value));
        }
    }
}