import { CButton, CCard, CCardBody, CCol, CFormGroup, CLabel, CRow } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import Spinner from "src/components/Spinner";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { fetchBrands, uploadBrandLogo } from "src/redux/actions/BrandActions";



const BrandForm = (props) => {
    const dispatch = useDispatch();
    const {current_link,params} = useSelector(state => state.brand);
    const [formState,setFormState] = useState(props.defaultData ?? {
        website_url:"",
        brand_name:"",
        brand_logo:null
    })
    const [brandLogo,setBrandLogo] = useState(props.defaultData?.brand_logo ?? null);
    const loading = useSelector(state => state.app.loading);
    const hasId = () => {
        if(props.defaultData?.id !== null && typeof props.defaultData?.id !== "undefined"){
            return true;
        }
        return false;
    }
    const onSubmit = () => {
        props.submitHandler(formState)
    }
    const setFormValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }
    const onImageUploadComplete = (file_path) => {
        setBrandLogo(file_path);
        dispatch(fetchBrands(current_link,params))
    }
    const onUploadImage = (file,iloader) => {
        const formData = new FormData();
        formData.append('brand_icon',file);
        formData.append('brand_id',props.defaultData?.id);
        dispatch(uploadBrandLogo(formData,iloader,onImageUploadComplete))
    }
    return (
        <>
            <CCard>      
                <CCardBody>
                    <CRow>
                        {
                            hasId()?
                            <CCol xl={4} lg={4}>
                                <FileUploadComponent onFileChanged={onUploadImage} file_path={brandLogo} caption="Brand Logo" />
                            </CCol>:
                            <></>
                        }
                       
                        <CCol xl={hasId()? 8:12}  lg={hasId()? 8:12}>
                            <form>
                                <CFormGroup>
                                    <CLabel>Brand Name:<span className="text-danger">*</span></CLabel>
                                    <input onChange={(e) => setFormValue(e.target.value,"brand_name")} value={formState.brand_name ?? ""} className="form-control" placeholder="Enter Brand Name" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Website:</CLabel>
                                    <input onChange={(e) => setFormValue(e.target.value,"website_url")} value={formState.website_url} className="form-control" placeholder="Enter Website Url" />
                                </CFormGroup>
                                {
                                    (hasId())?
                                    <></>:
                                    <CFormGroup>
                                        <CLabel>Brand Logo</CLabel>
                                        <input onChange={(e) => setFormValue(e.target.files[0],"brand_logo")} type="file"  className="form-control" />
                                    </CFormGroup>
                                }
                                <CButton onClick={() => onSubmit()} color="primary"><Spinner status={loading} /> Submit</CButton>
                            </form>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            
        </>
    )
}

BrandForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    defaultData: PropTypes.object
}

export default BrandForm;