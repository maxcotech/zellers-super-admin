import { CButton } from "@coreui/react";
import { useState } from "react";
import AppModal from "src/components/AppModal";
import CategoryForm from "./CategoryForm";


const UpdateCategoryBtn = (props) => {
    const [showForm,setShowForm] = useState(false);
    const [loading,setLoading] = useState(false);
    const onSubmit = (data) => {
        props.submitHandler(data,setLoading);
    }
    return (
        <>
            <AppModal title="Update Category" closeOnBackdrop={false} size="lg" show={showForm} onClose={() => setShowForm(false)}>
                <CategoryForm onRefresh={props.onRefresh} submitHandler={onSubmit} loading={loading}  editMode={true} defaultData={props.data} category_image={props.data.category_image} category_icon={props.data.category_icon} />
            </AppModal>
            <CButton onClick={() => setShowForm(true)} color="dark">Update</CButton>
        </>
    )
}

export default UpdateCategoryBtn;