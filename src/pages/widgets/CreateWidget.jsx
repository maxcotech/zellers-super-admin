import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { setCurrentWidget, uploadWidget, uploadWidgetItems } from "src/redux/actions/WidgetActions";
import ItemsFormContainer from "./components/ItemsFormContainer";
import WidgetForm from "./components/WidgetForm";



const CreateWidget = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showItemForm,setShowItemForm] = useState(false);
    const [loading,setLoading] = useState(false);
    const onComplete = (data) => {
        dispatch(setCurrentWidget(data));
        if(props.onComplete) props.onComplete();
        setShowItemForm(true);
    }
    const onCreateWidget = (data,iloader) => {
        dispatch(uploadWidget(data,iloader,onComplete));
    }
    const onPublishItems = () => {
       dispatch(uploadWidgetItems(setLoading,() => {
           setShowItemForm(false);
           if(props.location.pathname === "/widget/create"){
               history.push("/widgets");
           }
       })) 
    }
    return (
        <>
            <CRow>
                <CCol lg={{ size: 8, offset: 2 }}>
                    <CCard>
                        <CCardHeader>
                            <h4>Create Widget</h4>
                        </CCardHeader>
                        <CCardBody>
                            <WidgetForm submitHandler={onCreateWidget} />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <AppModal size="xl" show={showItemForm} onClose={()=>setShowItemForm(false)} title="Create Widget Items">
                <ItemsFormContainer btn_title="Publish Items" />
                <div>
                    <CButton onClick={onPublishItems} color="primary"><Spinner status={loading} /> Publish</CButton>
                </div>
            </AppModal>
        </>
    )
}

export default CreateWidget;