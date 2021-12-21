import {CButton} from "@coreui/react";
import { useState } from "react";
import Spinner from "src/components/Spinner";
import { useFlutterwave,closePaymentModal } from "flutterwave-react-v3";
import { FLUTTERWAVE_CODE } from "src/config/constants/app_constants";
import { useDispatch } from "react-redux";
import { completeWithPaymentVerification } from "src/redux/actions/PaymentActions";

const FlutterwaveBtn = (props) => {
    const {config} = props
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const getFlutterwaveConfig = (data) => {
        const {customer_details} = data;
        const {telephone_code,phone_number,currency,first_name,last_name,email} = customer_details;
        const config = {
            public_key:data.flutterwave_public_key,
            tx_ref:data.reference,
            amount:data.total_payment,
            currency:currency[0].currency_code,
            payment_options: 'card,mobilemoney,ussd',
            customer:{
                email:email,
                phonenumber:telephone_code+phone_number,
                name:first_name+" "+last_name
            },
            customizations:{
                title:"Order Payment",
                description:"Payment for items in the shopping cart",
                icon:null
            }

        }
        console.log(config);
        return config;
        
    }
    const handleFlutterPay = useFlutterwave(getFlutterwaveConfig(config));
    const getVerificationRequestData = (data) => {
        return {
            gateway_code: FLUTTERWAVE_CODE,
            gateway_reference: data.flw_ref,
            transaction_id: data.transaction_id,
            site_reference: data.tx_ref
        }
    }

    const onVerificationComplete = (response) => {
        console.log(response);
        closePaymentModal();
    }
   
    const onBtnClick = () => {
       handleFlutterPay({
           callback:async (response) => {
              console.log(response);
              const verificationData = getVerificationRequestData(response);
              dispatch(completeWithPaymentVerification(verificationData,onVerificationComplete))
           },
           onClose:() => {
               console.log('yea close your ass dude.');
           }
       })
    }
    return (
        <CButton onClick={onBtnClick} color="primary"><Spinner status={loading} /> Pay with Flutterwave</CButton>
    )
}

export default FlutterwaveBtn;