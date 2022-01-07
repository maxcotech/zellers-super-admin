import { CCard, CCardBody, CCol, CFormGroup, CLabel, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import { setWidgetItemValue, uploadWidgetImage } from "src/redux/actions/WidgetActions";

const WidgetItemForm = (props) => {
    const {item_title,item_image_url,item_link} = props.item;
    const itemLinkRef = useRef(item_link ?? "");
    const itemTitleRef = useRef(item_title ?? "");
    const dispatch = useDispatch();
    const setInputStateValue = (e,key) => {
        dispatch(setWidgetItemValue(e.target.value,key,props.index))
    }
    
    const onFileChanged = (file,iloader) => {
        dispatch(uploadWidgetImage(file,props.index,iloader))
    }
    useEffect(() => {
        itemLinkRef.current.value = item_link ?? "";
        itemTitleRef.current.value = item_title ?? "";
    },[props.index])

    return (
        <>
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol lg={4} sm={12}>
                            <FileUploadComponent caption="Widget Image" onFileChanged={onFileChanged} file_path={item_image_url ?? null} />
                        </CCol>
                        <CCol lg={8} sm={12}>
                            <CFormGroup>
                                <CLabel>Item Title</CLabel>
                                <input onBlur={(e) => setInputStateValue(e,'item_title')} placeholder="Enter Item title" ref={itemTitleRef} className="form-control" />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel>Item Link</CLabel>
                                <input onBlur={(e) => setInputStateValue(e,'item_link')} placeholder="Enter Item Link" ref={itemLinkRef} className="form-control" />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

WidgetItemForm.propTypes = {
    index:PropTypes.number.isRequired,
    item:PropTypes.object.isRequired,
}

export default WidgetItemForm;