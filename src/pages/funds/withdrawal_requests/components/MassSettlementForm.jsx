import { CButton, CCard, CCardBody, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel } from "@coreui/react";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from "src/components/Spinner";
import { useDispatch } from 'react-redux';
import { fetchCurrencies } from 'src/redux/actions/CountryActions';
import HtmlEntity from "src/components/HtmlEntity";


const MassSettlementForm = (props) => {
    const {submitHandler,gateways} = props;
    const {currency_sym} = useSelector(state => state.auth.currency);
    const currencies = useSelector(state => state.country.currencies);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formState,setFormState] = useState({
        max_amount:"",
        gateway_id:"",
        currency_id:""
    });
    const setFValue = (value,key) => {
        setFormState({
            ...formState,
            [key]: value
        })
    }

    const onSubmit = () => {
        submitHandler(formState,setLoading);
    }

    useEffect(() => {
        if(currencies.length < 1){
            dispatch(fetchCurrencies())
        }
    },[])

    return (
        <CCard>
            <CCardBody>
                <CFormGroup>
                    <CLabel>Maximum Amount</CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText><HtmlEntity>{currency_sym}</HtmlEntity></CInputGroupText>
                        </CInputGroupPrepend>
                        <input placeholder="Enter Maximum Amount" onChange={(e) => setFValue(e.target.value,"max_amount")} type="number" className="form-control" value={formState.max_amount} />
                    </CInputGroup>
                    <span className="text-muted form-text">
                        The maximum amount that this request can debit from you in the process of settling multiple vendors' requests.
                    </span>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Payment Gateway</CLabel>
                    <select className="form-control" value={formState.gateway_id} onChange={(e) => setFValue(e.target.value,"gateway_id")} >
                        <option value="">Select Payment Gateway</option>
                        {
                            gateways.map((item) => (
                                <option key={item.method_id} value={item.method_id}>{item.method_name}</option>
                            ))
                        }
                    </select>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Bank Currency</CLabel>
                    <select className="form-control" value={formState.currency_id} onChange={(e) => setFValue(e.target.value,"currency_id")} >
                        <option value="">Select Currency</option>
                        {
                            currencies.map((item) => (
                                <option key={item.id} value={item.id}>{`${item.currency_name} (${item.currency_code})`}</option>
                            ))
                        }
                    </select>
                    <span className="text-muted form-text">
                        Currency supported by the payout bank accounts. This will filter requests by currencies.
                    </span>
                </CFormGroup>
                <CButton onClick={onSubmit} disabled={loading} color="primary"><Spinner status={loading} /> Submit</CButton>
                
            </CCardBody>
        </CCard>
    )
}

export default MassSettlementForm;