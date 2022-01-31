
import { SUPPORT_ACTION_TYPES } from './../action_types/SupportActionTypes';
import { getService, patchService } from './ActionServices';
import { BASE_URL } from 'src/config/constants/app_constants';

export const defaultMessageUrl = `${BASE_URL}support/messages`;
export const setMessages = (payload) => ({type:SUPPORT_ACTION_TYPES.setMessages,payload});
export const setCurrentLink = (payload) => ({type:SUPPORT_ACTION_TYPES.setCurrentLink,payload});
export const setParams = (payload) => ({type:SUPPORT_ACTION_TYPES.setParams,payload});

export const fetchMessages = (url = null, params = {}, iloader = null, onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultMessageUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            dispatch(setMessages(data));
            dispatch(setCurrentLink(currentPath));
            dispatch(setParams(params));
            if(onComplete) onComplete();
        }}))
    }
}

export const updateSeenStatus = (data,iloader = null, onComplete = null) => {
    return (dispatch) => {
        dispatch(patchService(`${BASE_URL}support/message/status`,data,{silent:true,iloader,onComplete}))
    }
}