import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { UserStatus } from "src/config/app_config/user_config";
import { confirmAction } from "src/config/helpers/message_helpers";
import { updateUserStatus } from "src/redux/actions/UserActions";


const AccountStatusSelect = (props) => {
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const onStatusChanged = async (e) => {
        const data = {
            user_id:props.user_id,
            status:e.target.value
        }
        if(props.shouldConfirm){
            if(await confirmAction({text:"This will update the selected user's account status."})){
                dispatch(updateUserStatus(data,setLoading,props.onComplete));
            } 
        } else {
            dispatch(updateUserStatus(data,setLoading,props.onComplete));
        }
    }

    return (
        <>
            <Spinner status={loading} />
            <select onChange={onStatusChanged} {...props}>
                <option value="">Select Status</option>
                <option value={UserStatus.active}>Active</option>
                <option value={UserStatus.inactive}>Inactive</option>
                <option value={UserStatus.readOnly}>Read Only</option>
            </select>
        </>
        
    )
}

export default AccountStatusSelect;