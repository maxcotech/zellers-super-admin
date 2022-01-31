import AppModal from "src/components/AppModal";
import { useState } from 'react';
import { CButton, CFormGroup, CLabel, CCard, CCardBody, CCardFooter } from "@coreui/react";
import Spinner from "src/components/Spinner";



const BannerTextFormBtn = (props) => {
    const { item, submitHandler } = props;
    const [visible, setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const [formState, setFormState] = useState({
        id: item.id ?? null,
        banner_link: item.banner_link ?? null
    });
    const onApplyChanges = () => {
        submitHandler(formState,setLoading,() => setVisible(false));
    }
    const setFValue = (e, key) => {
        const val = e.target.value;
        setFormState({
            ...formState,
            [key]: val
        })
    }

    
    return (
        <>
            <AppModal title="Banner Text" onClose={() => setVisible(false)} show={visible}>
                <CCard>
                    <CCardBody>
                        <form>
                            <CFormGroup>
                                <CLabel>Banner Url</CLabel>
                                <input placeholder="Enter Banner URL" className="form-control" value={formState.banner_link} onChange={(e) => setFValue(e, "banner_link")} />
                            </CFormGroup>
                        </form>
                    </CCardBody>
                    <CCardFooter>
                        <CButton onClick={onApplyChanges} color="primary"><Spinner status={loading} /> Apply Changes</CButton>
                    </CCardFooter>
                </CCard>

            </AppModal>
            <CButton color="primary" onClick={() => setVisible(true)}>Edit Text</CButton>
            
        </>
    )
}

export default BannerTextFormBtn;