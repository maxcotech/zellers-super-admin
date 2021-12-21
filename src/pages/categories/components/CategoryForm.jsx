import { CButton, CCard, CCardBody, CCol, CFormGroup, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from "@coreui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FileUploadComponent from "src/components/FileUploadComponent";
import HtmlEntity from "src/components/HtmlEntity";
import Spinner from "src/components/Spinner";
import { uploadCategoryFile } from "src/redux/actions/CategoryActions";


const CategoryForm = (props) => {
    const loading = props.loading;
    const dispatch = useDispatch();
    const getDefaultValues = () => {
        if (props.defaultData) {
            return props.defaultData;
        } else {
            return null;
        }
    }
    const [formState, setFormState] = useState(getDefaultValues() ?? {
        id: null,
        category_title: "",
        display_level: "",
        display_title: "",
        commission_fee: ""
    });
    const [categoryIcon, setCategoryIcon] = useState(props.category_icon ?? null);
    const [categoryImage, setCategoryImage] = useState(props.category_image ?? null);

    const setFormStateValue = (value, key) => {
        setFormState({
            ...formState,
            [key]: value
        })
    }

    const onSubmitForm = () => {
        const data = formState;
        if (typeof props.parent_id !== "undefined" && props.parent_id !== null) {
            data.parent_id = props.parent_id;
        }
        props.submitHandler(data);
    }

    const onCategoryImageChange = (file,iloader) => {
        const meta = {
            file_type: "category_image",
            id: props.defaultData.id
        }
        dispatch(uploadCategoryFile(
            file,meta,iloader,
            (path) => {
                setCategoryImage(path);
                if(props.onRefresh) props.onRefresh();
        }))
    }

    const onCategoryIconChange = (file,iloader) => {
        const meta = {
            file_type: "category_icon",
            id: props.defaultData.id
        }
        dispatch(uploadCategoryFile(
            file,meta,iloader,
            (path) => {
                setCategoryIcon(path);
                if(props.onRefresh) props.onRefresh();
        }))
    }


    return (
        <>
            <CRow>
                {
                    (props.editMode && props.defaultData.id)?
                    <CCol md={4} lg={4} sm={12}>
                        <FileUploadComponent onFileChanged={onCategoryIconChange} id={props.defaultData.id+"icon"} file_path={categoryIcon} caption="Category Icon" />
                        <FileUploadComponent onFileChanged={onCategoryImageChange} id={props.defaultData.id+"image"} file_path={categoryImage} caption="Category Image" />
                    </CCol>:
                    <></>
                }
                
                <CCol md={(props.editMode)? 8:12} lg={(props.editMode)? 8:12} sm={12}>
                    <CCard>
                        <CCardBody>
                            <form>
                                <CFormGroup>
                                    <CLabel>Category Title:<span className="text-danger">*</span></CLabel>
                                    <input placeholder="Enter Category Title" onChange={(e) => setFormStateValue(e.target.value, 'category_title')} className="form-control" value={formState.category_title} />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Display Title:</CLabel>
                                    <input placeholder="Eg: Most awesome leather bags" onChange={(e) => setFormStateValue(e.target.value, 'display_title')} className="form-control" value={formState.display_title} />
                                    <small className="form-text text-muted">
                                        This is the text used when promoting items under this category, it can be a simple description of benefits of purchasing items under this category.
                                    </small>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Display Level:</CLabel>
                                    <input type="number" placeholder="Enter Display Level" onChange={(e) => setFormStateValue(e.target.value, 'display_level')} className="form-control" value={formState.display_level} />
                                    <small className="form-text text-muted">
                                        This enables you determine how much gallery images should be required for products under this category.
                                        The higher the numbers the higher the number of required images, maximum value should be 4;
                                    </small>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Commission Fee:<span className="text-danger">*</span></CLabel>
                                    <CInputGroup>
                                        <input type="number" placeholder="Enter Commission Fee" onChange={(e) => setFormStateValue(e.target.value, 'commission_fee')} className="form-control" value={formState.commission_fee} />
                                        <CInputGroupText>
                                            <HtmlEntity>%</HtmlEntity>
                                        </CInputGroupText>
                                        <small className="form-text text-muted">
                                            The commission fee will be calculated as a percentage of the total amount paid for an item.
                                            Any amount you entered here will apply to all the products that falls within this category.
                                        </small>
                                    </CInputGroup>
                                </CFormGroup>
                                <CFormGroup>
                                    <CButton onClick={() => onSubmitForm()} color="primary"><Spinner status={loading} /> Submit</CButton>
                                </CFormGroup>
                            </form>
                        </CCardBody>
                    </CCard>

                </CCol>
            </CRow>
        </>
    )
}

CategoryForm.propTypes = {
    editMode: PropTypes.bool,
    submitHandler: PropTypes.func,
    parent_id: PropTypes.number,
    category_image: PropTypes.string,
    category_icon: PropTypes.string,
    onRefresh: PropTypes.func
}

export default CategoryForm;