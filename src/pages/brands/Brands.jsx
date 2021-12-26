import { CAlert, CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import { createBrand, defaultBrandsUrl, fetchBrands } from "src/redux/actions/BrandActions";
import BrandForm from "./components/BrandForm";
import BrandTable from "./components/BrandTable";



const Brands = () => {
    const {status} = useParams();
    const {brands,links,params,current_link} = useSelector(state => state.brand);
    const [showBrandForm,setShowBrandForm] = useState(false);
    const dispatch = useDispatch();
    const onPaginateClick = (url) => {
        dispatch(fetchBrands(url,params))
    }
    const onCreateBrand = (data) => {
        const formData = new FormData();
        const keys = Object.keys(data);
        keys.forEach((key) => {
            if(key == "brand_logo" && data[key] === null){
                return;
            }
            formData.append(key,data[key]);
        });
        dispatch(createBrand(formData,() => {
            dispatch(fetchBrands(current_link,params,() => setShowBrandForm(false)))
        }))
    }

    useEffect(() => {
        dispatch(fetchBrands(defaultBrandsUrl,{...params,status:status ?? null}))
    },[status]) 

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block">Brands</h4>
                    <div className="card-header-actions">
                        <CButton onClick={() => setShowBrandForm(true)} color="primary">+ Add Brand</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (brands.length > 0)?
                        <>
                            <BrandTable  brands={brands} />
                            <div>
                                <PaginationComponent onClick={onPaginateClick} links={links} />
                            </div>
                        </>:
                        <CAlert color="info">
                            <h4>No Brands Found</h4>
                            <p>Could not find any brand within the selected category.</p>
                            <CButton onClick={() => setShowBrandForm(true)} color="primary">+ Add Brand</CButton>
                        </CAlert>
                    }
                </CCardBody>
            </CCard>
            <AppModal title="Create Brand" show={showBrandForm} onClose={() => setShowBrandForm(false)}>
                <BrandForm submitHandler={onCreateBrand} />
            </AppModal>
        </>
    )
}

export default Brands;