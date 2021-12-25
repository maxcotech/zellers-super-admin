import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import ProductFilters from "src/pages/products/components/ProductFilters";
import ProductTable from "src/pages/products/components/ProductTable";
import { defaultCatalogUrl, fetchProducts } from "src/redux/actions/ProductActions";


const StoreProductsBtn = (props) => {
    const {store,title} = props;
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const {params,products,links} = useSelector(state => state.product);
    const [showFilters,setShowFilters] = useState(false);
    const dispatch = useDispatch();
    const onBtnClick = () => {
        dispatch(fetchProducts(
            defaultCatalogUrl,
            {...params,store},
            () => setVisible(true),
            setLoading
        ))
    }
    const onPaginateClick = (url) => {
        dispatch(fetchProducts(url,params))
    }
    const onFilter = (params) => {
        dispatch(fetchProducts(
            defaultCatalogUrl,
            params,
            () => setShowFilters(false),
        ))
    }

    return (
        <>
            <AppModal title="Store Products" size="xl" closeOnBackdrop={false} show={visible} onClose={() => setVisible(false)}>
                <CCard>
                    <CCardHeader>
                        <h4 className="inline-block">{title ?? ""}</h4>
                        <div className="card-header-actions">
                            <CButton onClick={() => setShowFilters(true)} color="light">Filters</CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <ProductTable products={products} />
                        <div>
                            <PaginationComponent links={links} onClick={onPaginateClick} />
                        </div>
                    </CCardBody>
                </CCard>
            </AppModal>
            <AppModal title="Product Filters"  show={showFilters} onClose={() => setShowFilters(false)}>
                <ProductFilters onApplyChanges={onFilter} />    
            </AppModal>
            <CButton onClick={onBtnClick} color="light"><Spinner status={loading} /> Products</CButton>
        </>
    )
}

export default StoreProductsBtn;