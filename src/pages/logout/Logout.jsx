import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/actions/AuthActions";

const { CCard, CCardBody, CAlert } = require("@coreui/react")

const Logout = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser());
    },[])
    return (
        <CCard>
            <CCardBody>
                <CAlert color="info">
                    <h3>Logging out</h3>
                    <p>Logging you out, please wait....</p>
                </CAlert>
            </CCardBody>
        </CCard>
    )
}

export default Logout;