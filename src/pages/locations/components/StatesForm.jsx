import { CButton, CCard, CCardBody, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import Spinner from "src/components/Spinner";

const StatesForm = (props) => {
    const {defaultData,submitHandler} = props;
    const [loading,setLoading] = useState(false);
    const [formState,setFormState] = useState(
        {
            id: defaultData?.id ?? null,
            state_name: defaultData?.state_name ?? "",
            state_code: defaultData?.state_code ?? "",
            country_id: defaultData?.country_id ?? ""
        }
    )
    const setFValue = (e,key) => {
        setFormState({
            ...formState,
            [key]:e.target.value
        })
    }
    const onSubmit = () => {
        submitHandler(formState,setLoading)
    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <form>
                        <CFormGroup>
                            <CLabel>State Name</CLabel>
                            <input placeholder="Enter State Name" onChange={(e) => setFValue(e,"state_name")} value={formState.state_name} className="form-control" />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel>State Code</CLabel>
                            <input placeholder="Enter State Code" onChange={(e) => setFValue(e,"state_code")} value={formState.state_code} className="form-control" />
                        </CFormGroup>
                        <CButton color="primary" onClick={onSubmit}><Spinner status={loading} /> Submit</CButton>
                    </form>
                </CCardBody>
            </CCard>
        </>
    )
}

export default StatesForm;