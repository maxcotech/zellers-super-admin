import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import CustomBadge from "src/components/CustomBadge";


const CustomerDetailsCard = (props) => {
    const {billing_address,user} = props;
    return (
        <CCard>
            <CCardHeader>
                Customer Details
            </CCardHeader>
            <CCardBody>
            <table style={{width:"100%"}}>
                <tbody>
                    <tr>
                        <td><CustomBadge>First&nbsp;Name</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{user.first_name ?? "N/A"}</td>
                    </tr>
                    <tr>
                        <td><CustomBadge>Last&nbsp;Name</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{user.last_name ?? "N/A"}</td>
                    </tr>
                    <tr>
                        <td><CustomBadge>Customer&nbsp;Email</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{user.email ?? "N/A"}</td>
                    </tr>
                    <tr>
                        <td><CustomBadge>Phone&nbsp;Number</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{billing_address.telephone_code+billing_address.phone_number}</td>
                    </tr>
                    <tr>
                        <td><CustomBadge>Additional&nbsp;Number</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{(billing_address.additional_telephone_code != null && billing_address.additional_number != null)? 
                         billing_address.additional_telephone_code+billing_address.additional_number : "N/A"}</td>
                    </tr>
                    <tr>
                        <td><CustomBadge>User&nbsp;Status</CustomBadge></td>
                        <td style={{fontSize:"0.9em"}}>{user.account_status == 1? "Active":"In-active"}</td>
                    </tr>
                </tbody>
            </table>
            </CCardBody>
        </CCard>
    )
}

export default CustomerDetailsCard;