import { useState } from "react"
import {CButton, CCard, CCardBody} from "@coreui/react";
import AppModal from "src/components/AppModal";
import ShippingGroupForm from "./ShippingGroupForm";
import { useDispatch } from "react-redux";
import { updateShippingGroup } from "src/redux/actions/ShippingGroupActions";

const UpdateShippingGroup = (props) => {
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdateShippingGroup = (formData) => {
        dispatch(updateShippingGroup(formData,() => setVisible(false)))
    }

    return ( 
        <>
            <AppModal title="Update Shipping Group" show={visible} onClose={() => setVisible(false)}>
                <CCard>
                    <CCardBody>
                        <ShippingGroupForm submitHandler={onUpdateShippingGroup} defaultData={props.data} />
                    </CCardBody>
                </CCard>
            </AppModal>
            <CButton onClick={()=>setVisible(true)} color={props.color ?? "primary"}>{props.children}</CButton>
        </>
    )
}

export default UpdateShippingGroup;