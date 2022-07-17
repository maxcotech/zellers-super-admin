import { CCol, CRow } from "@coreui/react";

const EmptyPage = (props) => {
    const {caption} = props;
    return (
        <div>
            <CRow>
                <CCol sm={{offset:2,size:10}} lg={{offset:4,size:4}}>
                    <img className="img-fluid" src="images/empty-page.png" alt="empty page" />
                </CCol>
                <CCol sm={12} lg={12}>
                    <div className="text-center">
                        {caption ?? "Could not find what you are looking for."}
                    </div>
                </CCol>
            </CRow>
        </div>
    )
}

export default EmptyPage;