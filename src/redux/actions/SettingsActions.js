import { BASE_URL } from "src/config/constants/app_constants"
import { getService, putService } from "./ActionServices"

export const changePassword = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(putService(`${BASE_URL}user/password`,data,{iloader,onComplete}))
    }
}

export const completeWithPreferences = (iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(getService(`${BASE_URL}admin/preferences`,{iloader,onComplete:(data) => {
            if(onComplete) onComplete(data);
        }}))
    }
}

export const updatePreferences = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(putService(`${BASE_URL}admin/preferences`,data,{iloader,onComplete}))
    }
}