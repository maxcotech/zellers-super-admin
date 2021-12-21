import {toast} from "react-toastify";
import { handleArrayMessage } from "./message_helpers";

export const handleAxiosError = (ex,callback = null) => {
    if(callback) callback();
    if(ex){
        if(ex.response?.data){
            console.log(ex.response.data.message ?? "An Unknown error");
            handleArrayMessage(ex.response.data.message ?? "sorry, unknown error occurred.",toast.error,"\n" );
            //toast.error(ex.response.data.message ?? );
            return;
        }
    }
    toast.error('Sorry, An error occurred, please contact the developers.');
}