import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import ProductFilters from "src/pages/products/components/ProductFilters";
import ProductTable from "src/pages/products/components/ProductTable";
import { defaultCategoryProductUrl, fetchCategoryProducts } from "src/redux/actions/ProductActions";



const CategoryProductsBtn = (props) => {
    const {title,slug} = props;
    const [visible,setVisible] = useState(false);
    const {links,params,products} = useSelector(state => state.product);
    const [loading,setLoading] = useState(false);
    const [showFilters,setShowFilters] = useState(false);
    const dispatch = useDispatch();
    const onBtnClick = () => {
        dispatch(
            fetchCategoryProducts(
                defaultCategoryProductUrl+slug,
                params,setLoading,() => setVisible(true)
            )
        )
    }
    const onPaginateClick = (url) => {
        dispatch(fetchCategoryProducts(
            slug,url,
            params,setLoading
        ))
    }

    const onFilter = (params) => {
        dispatch(fetchCategoryProducts(
            defaultCategoryProductUrl+slug,
            params,null,() => setShowFilters(false)
        ))
    }
    return (
        <>
            <AppModal size="xl" show={visible} onClose={()=>setVisible(false)} closeOnBackdrop={false}  title={"Category Products"}>
               <CCard>
                   <CCardHeader>
                        <h4 className="inline-block">{title ?? ""}</h4>
                        <div className="card-header-actions">
                            <CButton onClick={() => setShowFilters(true)} color="light">Filters</CButton>
                        </div>
                   </CCardHeader>
                   <CCardBody>
                        <div className="table-responsive">
                                <ProductTable products={products}/>
                        </div>
                        <div>
                            <PaginationComponent onClick={onPaginateClick} links={links} />
                        </div>
                   </CCardBody>
               </CCard>
            </AppModal>
            <AppModal title="Product Filters" show={showFilters} onClose={() => setShowFilters(false)}>
               <ProductFilters onApplyChanges={onFilter} />
            </AppModal>
            <CButton onClick={onBtnClick} color="light"><Spinner status={loading} /> Products</CButton>
        </>
    )
}

export default CategoryProductsBtn;