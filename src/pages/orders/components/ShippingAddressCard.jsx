import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react"
import CustomBadge from "src/components/CustomBadge";


const ShippingAddressCard = (props) => {
    const {billing_address} = props;
    const getAddressName = () => {
        if(billing_address?.first_name != null && billing_address?.last_name != null){
            return billing_address?.first_name+" "+billing_address?.last_name;
        } else {
            return "N/A"
        }
    }
    return (
        <CCard>
            <CCardHeader>
                Billing Address
            </CCardHeader>
            <CCardBody>
                <table style={{width:"100%"}}>
                    <tbody>
                <tr>
                    <td><CustomBadge>Postal&nbsp;Code</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{billing_address.postal_code ?? "No Postal Code"}</td>
                </tr>
                <tr>
                    <td><CustomBadge>Street&nbsp;Address</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{billing_address.street_address}</td>
                </tr>
                <tr>
                    <td><CustomBadge>Shipping&nbsp;City</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{billing_address.city?.city_name ?? "N/A"}</td>
                </tr>
                <tr>
                    <td><CustomBadge>Shipping&nbsp;State</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{billing_address.state?.state_name ?? "N/A"}</td>
                </tr>
                <tr>
                    <td ><CustomBadge>Shipping&nbsp;Country</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{billing_address.country?.country_name ?? "N/A"}</td>
                </tr>
                <tr>
                    <td ><CustomBadge>Receiver&nbsp;Name</CustomBadge></td>
                    <td style={{fontSize:"0.9em"}}>{getAddressName()}</td>
                </tr>
                </tbody>
                </table>
            </CCardBody>
        </CCard>
    )
}

export default ShippingAddressCard;