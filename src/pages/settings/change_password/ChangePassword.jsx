import { CButton, CCard, CCardBody, CCardHeader, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { changePassword } from "src/redux/actions/SettingsActions";

const ChangePassword = () => {
    const [loading,setLoading] = useState(false);
    const initialState = {
        old_password:"",
        new_password:"",
        confirm_password:""
    }
    const [formState,setFormState] = useState(initialState);
    const dispatch = useDispatch();

    const setFValue = (e,key) => {
        setFormState({
            ...formState,
            [key]: e.target.value
        })
    }

    const onSubmit = () => {
        dispatch(changePassword(formState,setLoading,() => {
            setFormState(initialState);
        }))
    }

    return (
        <CCard>
            <CCardHeader>
                <h5>Change Password</h5>
            </CCardHeader>
            <CCardBody>
                <form>
                    <CFormGroup>
                        <CLabel>Old Password:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"old_password")} value={formState.old_password} placeholder="Enter Old Password" className="form-control" type="password" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>New Password:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"new_password")} value={formState.new_password} placeholder="Enter New Password" className="form-control" type="password" />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Confirm Password:<span className="text-danger">*</span></CLabel>
                        <input onChange={(e) => setFValue(e,"confirm_password")} value={formState.confirm_password} placeholder="Enter Password Confirmation" className="form-control" type="password" />
                    </CFormGroup>
                    <CButton disabled={loading} onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                </form>
            </CCardBody>
        </CCard>
    )
}

export default ChangePassword;