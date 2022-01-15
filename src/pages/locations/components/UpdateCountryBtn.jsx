import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { updateCountry } from "src/redux/actions/CountryActions";
import CountryForm from "./CountryForm";


const UpdateCountryBtn = (props) => {
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdateCountry = (data,iloader = null) => {
        dispatch(updateCountry(data,iloader,() => {
            if(props.onComplete) props.onComplete();
            setVisible(false)
        }
    ))
    }
    return (
        <>
            <CButton onClick={() => setVisible(true)} color="primary">Update</CButton>
            <AppModal title="Update Country" show={visible} onClose={() => setVisible(false)}>
                <CountryForm submitHandler={onUpdateCountry} defaultData={props.country}/>
            </AppModal>
        </>
    )
}

export default UpdateCountryBtn;