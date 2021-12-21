import {CRow,CCol, CCard, CCardBody, CCardHeader} from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateStore, uploadStoreLogo } from "src/redux/actions/StoreActions";
import FileUploadComponent from "../../../components/FileUploadComponent";
import StoreForm from "../components/StoreForm";

const EditStore = () => {

    const dispatch = useDispatch();
    const currentStore = useSelector(state => state.store.current_store);
    const [logo,setLogo] = useState(currentStore.store_logo);
    const onUpdateStore = (data) => {
        data.store_id = currentStore.id;
        dispatch(updateStore(data));
    }
    const onFileChanged = (file,iloader = null) => {
        dispatch(uploadStoreLogo(
            file,currentStore.id,
            iloader,(val) => setLogo(val)
        ))
    }
    

    return (
        <>
            <CRow>
                <CCol lg={3}>
                    <FileUploadComponent 
                        caption="Store Logo"
                        onFileChanged={onFileChanged}
                        file_path={logo}
                    />
                </CCol>
                <CCol lg={9}>
                    <CCard>
                        <CCardHeader>
                            <h4>Update Store</h4>
                        </CCardHeader>
                        <CCardBody>
                            <StoreForm 
                                defaultData={currentStore}
                                editMode={true} 
                                submitHandler={onUpdateStore} 
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EditStore;