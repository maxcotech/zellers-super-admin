import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { updateCity } from "src/redux/actions/CityActions";
import CitiesForm from "./CitiesForm";


const UpdateCityBtn = (props) => {
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdateCity = (data,iloader = null) => {
        dispatch(updateCity(data,iloader,() => {
            setVisible(false);
            if(props.onComplete) props.onComplete();
        }))
    }
    return (
        <>
            <CButton onClick={() => setVisible(true)} color="primary">Update</CButton>
            <AppModal onClose={() => setVisible(false)} show={visible} title="Update City">
                <CitiesForm submitHandler={onUpdateCity} defaultData={props.city}/>
            </AppModal>
        </>
    )
}

export default UpdateCityBtn;