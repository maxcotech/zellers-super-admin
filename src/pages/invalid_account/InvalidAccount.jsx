import { CAlert } from "@coreui/react";
import { Link } from "react-router-dom";


const InvalidAccount = (props) => {
    return (
        <div style={{top:"20vh"}}>
            <CAlert color="danger">
                <h3>Invalid User Account</h3>
                <p>Sorry, your account is not supported in this platform.</p>
                <Link className="btn btn-primary" to="/logout">Logout</Link>
            </CAlert>
        </div>
    )
}

export default InvalidAccount;