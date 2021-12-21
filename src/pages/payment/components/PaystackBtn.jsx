import { CButton } from "@coreui/react";
import { usePaystackPayment } from "react-paystack";
import { useDispatch } from "react-redux";
import { PAYSTACK_CODE } from "src/config/constants/app_constants";
import { completeWithPaymentVerification } from "src/redux/actions/PaymentActions";


const PaystackBtn = (props) => {
    const {config} = props;
    const dispatch = useDispatch();
    const extractConfigData = () => {
        return {
            reference:config.reference,
            publicKey:config.paystack_public_key,
            amount:config.total_payment * 100, //convert to kobo
            email:config.customer_details.email
        }
    }
    const onVerificationComplete = (data) => {
        console.log(data);
    }
    const paystackPayment = usePaystackPayment(extractConfigData());
    const getVerificationRequestData = (data) => {
        return {
            gateway_code: PAYSTACK_CODE,
            gateway_reference: data.flw_ref,
            transaction_id: data.transaction,
            site_reference: data.trxref
        }
    }
    const onPaymentSuccess = (result) => {
        console.log(result);
        if(result.status == "success"){
            const data = getVerificationRequestData(result);
            dispatch(completeWithPaymentVerification(data,onVerificationComplete))
        }
    }
    const onClose = () => {
        console.log('Closing payment modal...')
    }
    
    return (
        <CButton 
            onClick={() => paystackPayment(onPaymentSuccess,onClose)}
            color="primary"
        >Pay With Paystack</CButton>
    );
}

export default PaystackBtn;