import { useState } from "react";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { changeStaffPosition } from "src/redux/actions/StoreStaffsActions";
import PropTypes from "prop-types";
import { StoreRoles } from "src/config/app_config/user_config";
import { useDispatch } from "react-redux";

const StaffPositionSelect = (props) => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const onChangeStaffPosition = async (newPosition) => {
        if(await confirmAction({text:'This action will either strip off or grant this staff privileges and access.'})){
            dispatch(changeStaffPosition(
                {new_position:newPosition,staff_id:props.staffId},setLoading
            ))
        }
    }
    

    return (
        <>
            <Spinner status={loading} />{" "}
            <select value={props.staffType} onChange={(e) => onChangeStaffPosition(e.target.value)} className="form-control inline-block">
                <option value="">Select Staff Position</option>
                <option value={StoreRoles.storeManager}>Store Manager</option>
                <option value={StoreRoles.storeWorker}>Store Worker</option>
            </select>
        </>
    )
}

StaffPositionSelect.propTypes = {
    staffId:PropTypes.number,
    staffType:PropTypes.number
}

export default StaffPositionSelect;