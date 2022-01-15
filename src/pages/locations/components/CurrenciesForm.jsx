import { CButton, CCard, CCardBody, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import Spinner from "src/components/Spinner";


const CurrenciesForm = (props) => {
    const {defaultData,submitHandler} = props;
    const [loading,setLoading] = useState(false);
    const [formState,setFormState] = useState({
        id: defaultData?.id ?? null,
        currency_name: defaultData?.currency_name ?? "",
        currency_code: defaultData?.currency_code ?? "",
        currency_symbol: defaultData?.currency_sym ?? "",
        base_rate: defaultData?.base_rate ?? "",
        country_id: defaultData?.country_id ?? null
    });

    const setFValue = (e,key) => {
        setFormState({
            ...formState,
            [key]:e.target.value
        })
    }
    const onSubmit = () => {
        submitHandler(formState,setLoading);
    }
    return (
        <CCard>
            <CCardBody>
                <form>
                    <CFormGroup>
                        <CLabel>Currency Name:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"currency_name")} value={formState.currency_name}  className="form-control" placeholder="Enter Currency Name" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Currency Code:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"currency_code")} value={formState.currency_code}  className="form-control" placeholder="Enter Currency Code" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Currency Symbol:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"currency_symbol")} value={formState.currency_symbol}  className="form-control" placeholder="Enter Currency Symbol" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Base Rate:<span className="text-danger">*</span></CLabel>
                        <input type="number" onChange={(e) => setFValue(e,"base_rate")} value={formState.base_rate}  className="form-control" placeholder="Enter Base Rate" />
                    </CFormGroup>
                    <CButton color="primary" onClick={onSubmit} disabled={loading}><Spinner status={loading} /> Submit</CButton>
                </form>
            </CCardBody>
        </CCard>
    )
}

export default CurrenciesForm;