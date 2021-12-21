import { CButton, CCard, CCardBody, CFormGroup, CInput, CSelect } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { StoreRoles } from "src/config/app_config/user_config";

const StaffTokenForm = (props) => {
    const loading = useSelector(state => state.app.loading);
    const [formState,setFormState] = useState({
        staff_type:"",
        amount:""
    })

    const setFormStateValue = (val,key) => {
        setFormState({
            ...formState,
            [key]:val
        })
    }

    return (
        <CCard>
            <CCardBody>
                <form>
                    <CFormGroup>
                        <CSelect onChange={(e) => setFormStateValue(e.target.value,'staff_type')} value={formState.staff_type}>
                            <option value="">Select Staff Type</option>
                            <option value={StoreRoles.storeManager}>Store Manager</option>
                            <option value={StoreRoles.storeWorker}>Store Worker</option>
                        </CSelect>
                    </CFormGroup>
                    <CFormGroup>
                        <CInput onChange={(e) => (e.target.value > 0)? setFormStateValue(e.target.value,'amount'):false} value={formState.amount} type="number" placeholder="Enter Number of Tokens" />
                    </CFormGroup>
                    <CFormGroup>
                        <CButton onClick={() => props.onSubmit(formState)} block={true} color="primary"><Spinner status={loading} /> SUBMIT</CButton>
                    </CFormGroup>
                </form>
            </CCardBody>
        </CCard>
    )
}

export default StaffTokenForm;