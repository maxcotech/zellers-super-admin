import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { updateShippingLocation } from "src/redux/actions/ShippingLocationActions";
import ShippingLocationForm from "./ShippingLocationForm";

const UpdateShippingLocation = (props) => {
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdateShippingLocation = (data) => {
        dispatch(updateShippingLocation(data,() => setVisible(false)))
    }

    return (
        <>
            <AppModal onClose={() => setVisible(false)} show={visible} title="Update Shipping Location">
                <ShippingLocationForm submitHandler={onUpdateShippingLocation} {...props}/>
            </AppModal>
            <CButton color="primary" onClick={()=>setVisible(true)}>Update</CButton>
        </>
    )
}

export default UpdateShippingLocation;