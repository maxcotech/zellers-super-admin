import AppModal from "../../../../components/AppModal";
import {useState} from "react";
import ShippingLocationForm from "./ShippingLocationForm";
import { CButton } from "@coreui/react";
import { useDispatch } from "react-redux";
import { createShippingLocations } from "src/redux/actions/ShippingLocationActions";

const CreateShippingLocation = (props) => {
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onCreateShippingLocation = (data) => {
        dispatch(createShippingLocations(data,() => setVisible(false)));
    }
    return (
        <>
            <AppModal title="Create Shipping Location" closeOnBackdrop={false} show={visible} onClose={() => setVisible(false)}>
                <ShippingLocationForm submitHandler={onCreateShippingLocation} {...props} />
            </AppModal>
            <CButton onClick={() => setVisible(true)} color="primary">+ Add Shipping Location</CButton>
        </>
    )
}

export default CreateShippingLocation;