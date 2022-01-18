
import { CButton, CCard, CCardBody, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel } from '@coreui/react';
import { useSelector } from 'react-redux';
import Spinner from 'src/components/Spinner';
import {useState} from "react";
import HtmlEntity from 'src/components/HtmlEntity';


const WalletTransactionForm = (props) => {
    const {submitHandler} = props;
    const {currency_sym} = useSelector(state => state.auth.currency);
    const [state,setState] = useState({
        amount:""
    });
    const [loading,setLoading] = useState(false);
    const onSubmit = () => {
        submitHandler(state,setLoading);
    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <CFormGroup>
                        <CLabel>Amount</CLabel>
                        <CInputGroup>
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <HtmlEntity>{currency_sym}</HtmlEntity>
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <input type="number" placeholder="Enter Amount" onChange={(e) => setState({...state,amount:e.target.value})}  value={state.amount} className="form-control" />
                        </CInputGroup>
                    </CFormGroup>
                    <CButton disabled={loading} onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                </CCardBody>
            </CCard>
        </>
    )
}

export default WalletTransactionForm;