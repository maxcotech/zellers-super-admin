import { BASE_URL } from 'src/config/constants/app_constants';
import { getService } from './ActionServices';

export const defaultWRequestsUrl = `${BASE_URL}withdrawal_requests`
export const fetchWRequests = (url = null,params = {},iloader = null,onComplete = null) => {
    return (dispatch) => {
        const currentPath = url ?? defaultWRequestsUrl;
        dispatch(getService(currentPath,{params,iloader,onComplete:(data) => {
            //TO BE COMPLETED 
        }}))
    }
}