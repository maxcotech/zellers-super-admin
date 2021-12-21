import { CAlert, CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { completeWithInitPaymentData } from "../../redux/actions/PaymentActions";
import FlutterwaveBtn from "./components/FlutterwaveBtn";
import PaystackBtn from "./components/PaystackBtn";

const Payment = (props) => {
    const [config,setConfig] = useState(null);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const onBtnClick = () => {
        dispatch(completeWithInitPaymentData((data) => 
        setConfig(data),
        (val) => setLoading(val)));
    }
    return (
        <CCard>
            <CCardBody>
                {
                    (config === null)?
                    <CButton onClick={onBtnClick} color="primary"><Spinner status={loading} /> Proceed To Payment</CButton>:
                    <CRow>
                        <CCol>
                            <FlutterwaveBtn config={config} />
                        </CCol>
                        <CCol>
                            <PaystackBtn config={config} />
                        </CCol>
                    </CRow>

                }
            </CCardBody>
        </CCard>
    )
}

export default Payment;