import { CButton, CCard, CCardBody, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import Spinner from "src/components/Spinner";


const CitiesForm = (props) => {
    const {defaultData,submitHandler} = props;
    const [loading,setLoading] = useState(false);
    const [formState,setFormState] = useState({
        id: defaultData?.id ?? null,
        state_id: defaultData?.state_id ?? null,
        city_name: defaultData?.city_name ?? "",
        city_code: defaultData?.city_code ?? ""
    })

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
                            <CLabel>City Name:<span className="text-danger">*</span></CLabel>
                            <input onChange={(e) => setFValue(e,"city_name")} value={formState.city_name} className="form-control" placeholder="Enter City Name" />
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel>City Code:</CLabel>
                            <input onChange={(e) => setFValue(e,"city_code")} value={formState.city_code} className="form-control" placeholder="Enter City Code" />
                        </CFormGroup>
                        <CButton disabled={loading} onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                    </form>
                </CCardBody>
            </CCard>
        </>
    )
}

export default CitiesForm;