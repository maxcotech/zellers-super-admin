import { BASE_URL } from 'src/config/constants/app_constants';
import { getService, patchService, postService } from './ActionServices';
import { WREQUEST_ACTION_TYPES } from './../action_types/WRequestActionTypes';

export const defaultWRequestsUrl = `${BASE_URL}withdrawal_requests`;

export const setRequests = (payload) => ({type:WREQUEST_ACTION_TYPES.setRequests,payload});
export const setParams = (payload) => ({type:WREQUEST_ACTION_TYPES.setParams,payload});
export const setCurrentLink = (payload) => ({type:WREQUEST_ACTION_TYPES.setCurrentLink,payload});

export const fetchWRequests = (url = null,params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultWRequestsUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setRequests(data));
            dispatch(setParams(params ?? {}));
            dispatch(setCurrentLink(currentPath));
            if(onComplete) onComplete();
        }}))
    }
}

export const getPaymentMethods = (iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(getService(`${BASE_URL}payment/methods`,{
            iloader,onComplete:(data) => {
                if(onComplete) onComplete(data);
            }
        }))
    }
}

export const updateRequestStatus = (data,iloader = null, onComplete = null) => {
    return (dispatch) => {
        dispatch(patchService(`${BASE_URL}withdrawal_request/status`,data,{iloader,onComplete}))
    }
}


export const settleSingleRequest = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}withdrawal_request/settle`,data,{iloader,onComplete}))
    }
}

export const settleMassRequests = (data,iloader = null,onComplete = null) => {
    return (dispatch) => {
        dispatch(postService(`${BASE_URL}withdrawal_requests/settle`,data,{iloader,onComplete}))
    }
}

