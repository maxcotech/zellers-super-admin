import { CButton, CCard, CCardBody, CFormGroup, CInput, CLabel } from "@coreui/react";
import { useState } from "react";
import AppModal from "src/components/AppModal";

const GenerateNumberOfDimensionRates = (props) => {
    const [visible,setVisible] = useState(false);
    const [numberOfRates,setNumberOfRates] = useState();
    const onApply = () => {
        props.onComplete(numberOfRates);
        setVisible(false);
    }

    return (
        <>
            <AppModal onClose={() => setVisible(false)} show={visible} title="Dimension Rates">
                <CCard style={{textAlign:"left"}}>
                    <CCardBody>
                        <CFormGroup>
                            <CLabel >
                                Dimensions Count
                            </CLabel>
                            <CInput placeholder="Enter Number of dimension ranges you wish to create" type="number" onChange={(e) => setNumberOfRates(e.target.value)} value={numberOfRates} />
                        </CFormGroup>
                        <CFormGroup>
                            <CButton onClick={onApply} block={true} color="primary">APPLY</CButton>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            </AppModal>
            <CButton color={props.color ?? "primary"} onClick={() => setVisible(true)}>{props.children}</CButton>
        </>
    )
}

export default GenerateNumberOfDimensionRates;