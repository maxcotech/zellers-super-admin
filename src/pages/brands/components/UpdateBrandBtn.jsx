import { CButton } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { fetchBrands, updateBrand } from "src/redux/actions/BrandActions";
import BrandForm from "./BrandForm";



const UpdateBrandBtn = (props) => {
    const [showForm,setShowForm] = useState(false);
    const {current_link,params} = useSelector(state => state.brand);
    const dispatch = useDispatch();
    const onUpdateBrand = (data) => {
        dispatch(updateBrand(data,null,() => {
            dispatch(fetchBrands(current_link,params,() => setShowForm(false)))
        }))
    }

    return (
        <>
            <CButton onClick={() => setShowForm(true)}  color="primary">
                Update
            </CButton>
            <AppModal size="lg" title="Update Brand" show={showForm} onClose={() => setShowForm(false)}>
                <BrandForm submitHandler={onUpdateBrand} {...props} />
            </AppModal>
            
        </>
    )
}

export default UpdateBrandBtn;