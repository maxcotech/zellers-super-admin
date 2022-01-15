import { CAlert, CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { BASE_URL } from "src/config/constants/app_constants";
import { fetchProducts, setCurrentParams } from "src/redux/actions/ProductActions";
import ProductFilters from "./components/ProductFilters";
import ProductTable from "./components/ProductTable";


const Products = () => {
    const {status} = useParams();
    const dispatch = useDispatch();
    const [showFilters,setShowFilters] = useState(false);
    const {products,links,params} = useSelector(state => state.product);
    const {loading} = useSelector(state => state.app);
    const onFilter = (params) => {
        dispatch(fetchProducts(`${BASE_URL}catalog`,params,() => setShowFilters(false)))
    }
    useEffect(() => {
        dispatch(setCurrentParams({status}))
        dispatch(fetchProducts(`${BASE_URL}catalog`,{...params,status}))
    },[status])

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Products</h4>
                    <div className="card-header-actions">
                        <CButton onClick={() => setShowFilters(true)}  color="primary"> Filters</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (products?.length > 0)?
                        <div>
                            <ProductTable products={products} />
                            <div>
                                <PaginationComponent onClick={(url) => dispatch(fetchProducts(url,params))} links={links} />
                            </div>
                        </div>:
                        <CAlert color="info">
                            <h4>Not Found</h4>
                            <p>Could not find any product within the specified filters.</p>
                        </CAlert>
                    }
                </CCardBody>

            </CCard>  
            <AppModal title="Product Filters"  show={showFilters} onClose={() => setShowFilters(false)}>
                <ProductFilters onApplyChanges={onFilter} />
            </AppModal>    
        </>
    )
}

export default Products;