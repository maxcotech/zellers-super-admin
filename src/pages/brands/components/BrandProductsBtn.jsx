import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import ProductFilters from "src/pages/products/components/ProductFilters";
import ProductTable from "src/pages/products/components/ProductTable";
import { defaultCatalogUrl, fetchProducts } from "src/redux/actions/ProductActions";


const BrandProductsBtn = (props) => {
    const { title,brand } = props;
    const { links, products,params,current_link} = useSelector(state => state.product);
    const [showFilters, setShowFilters ] = useState(false);
    const [loading,setLoading] = useState(false);
    const [visible,setVisible] = useState(false);
    const dispatch = useDispatch();
    const onFilter = (params) => {
        dispatch(fetchProducts(current_link,params))
    }
    const onPaginateClick = (url) => {
        dispatch(fetchProducts(url,params))
    }
    const onBtnClick = () => {
        dispatch(fetchProducts(
            defaultCatalogUrl,
            {...params,brand},
            () => {
                setVisible(true);
            },
            setLoading
        ))
    }
    return (
        <>
            <AppModal size="xl" onClose={() => setVisible(false)} show={visible} title="Brand Products">
                <CCard>
                    <CCardHeader>
                        <h4 className="inline-block">{title ?? ""}</h4>
                        <div className="card-header-actions">
                            <CButton onClick={() => setShowFilters(true)} color="light">Filters</CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className="table-responsive">
                            <ProductTable products={products} />
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

export default BrandProductsBtn;