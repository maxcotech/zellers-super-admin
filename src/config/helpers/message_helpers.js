import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const handleArrayMessage = (msg,callback = null,delimiter = '\n') => {
    if(msg === null || typeof msg === 'undefined') return false;
    if(msg.includes(msg)){
        msg = msg.trim(delimiter);
        let msgArr = msg.split(delimiter);
        msgArr.forEach((item) => {
            (callback)? callback(item):toast.info(item);
        })
    } else {
        (callback) ? callback(msg) : toast.info(msg);
    }
}

export const confirmAction = async (options = null) => {
    const result = await Swal.fire({
        title: options?.title ?? 'Are You Sure ??',
        icon: options?.icon ?? 'warning',
        text: options?.text ?? "This operation may be irreversible.",
        showCancelButton: true,
        confirmButtonText: options?.confirmButtonText ?? 'Continue',
    });
    return (result.isConfirmed)? true : false;
}