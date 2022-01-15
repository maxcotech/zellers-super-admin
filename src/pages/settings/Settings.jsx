import { CCol, CRow } from "@coreui/react";
import AdminPreferences from "./admin_preferences/AdminPreferences";
import ChangePassword from "./change_password/ChangePassword";

const Settings = (props) => {
    return (
        <>
            <CRow>
                <CCol lg={6} xl={6} sm={12}>
                    <ChangePassword />
                </CCol>
                <CCol lg={6} xl={6} sm={12}>
                    <AdminPreferences />
                </CCol>
            </CRow>
        </>
    )
}

export default Settings;