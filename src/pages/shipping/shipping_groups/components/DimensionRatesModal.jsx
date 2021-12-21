import { CButton } from "@coreui/react";
import { useState } from "react";
import AppModal from "src/components/AppModal";
import DimensionRatesTable from "./DimensionRatesTable";

const DimensionRatesModal = (props) => {
    const [visible,setVisible] = useState(false);

    return (
        <>
            <AppModal show={visible} onClose={() => setVisible(false)} title="Product Dimensions Rate">
                <DimensionRatesTable data={props.data} />
            </AppModal>
            <CButton onClick={() => setVisible(true)} color={props.color ?? "primary"}>{props.children}</CButton>
        </>
    )
}

export default DimensionRatesModal;