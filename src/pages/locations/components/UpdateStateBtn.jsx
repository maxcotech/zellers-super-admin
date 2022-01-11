import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { updateState } from "src/redux/actions/StateActions";
import StatesForm from "./StatesForm";


const UpdateStateBtn = (props) => {
    const {state,onComplete} = props;
    const dispatch = useDispatch();
    const [visible,setVisible] = useState(false);
    const onUpdateState = (data,iloader = null) => {
        dispatch(updateState(data,iloader,() => {
            if(onComplete) onComplete();
            setVisible(false);
        }))
    }
    return (
        <>
            <CButton onClick={() => setVisible(true)} color="primary" >Update</CButton>
            <AppModal title="Update State" show={visible} onClose={() => setVisible(false)}>
                {
                    (visible)? <StatesForm submitHandler={onUpdateState} defaultData={state} />:<></>
                }
            </AppModal>
        </>
    )
}

export default UpdateStateBtn;