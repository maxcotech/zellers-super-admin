import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { updateCurrency } from "src/redux/actions/CountryActions";
import CurrenciesForm from "./CurrenciesForm";

const UpdateCurrencyBtn = (props) => {
    const {onComplete,currency} = props
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onUpdate = (data,iloader = null) => {
        dispatch(updateCurrency(data,iloader,() => {
            setVisible(false);
            if(onComplete) onComplete();
        }))
    }
    return (
        <>
            <CButton onClick={() => setVisible(true)} color="primary">Update</CButton>
            <AppModal  show={visible} onClose={() => setVisible(false)} title="Update Currency">
                <CurrenciesForm submitHandler={onUpdate} defaultData={currency} />
            </AppModal>
        </>
    )
}

export default UpdateCurrencyBtn;