import { CButton } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { fetchProductDetails} from "src/redux/actions/ProductActions";
import ProductDetails from "./ProductDetails";


const ProductDetailsBtn = (props) => {
    const {slug,id} = props;
    const [loading,setLoading] = useState(false);
    const [visible,setVisible] = useState(false);
    const [shouldRefresh,setShouldRefresh] = useState(false);
    const {product_details} = useSelector(state => state.product);
    const dispatch = useDispatch();
    const onLoadDetails = () => {
        dispatch(fetchProductDetails(slug ?? id,setLoading,() => {
            setVisible(true);
        }))
    }

    const onClose = () => {
        if(shouldRefresh){
            if(props.onRefresh) props.onRefresh();
        }
        setVisible(false);
    }
    return (
        <>
            <CButton onClick={onLoadDetails} color="primary"><Spinner status={loading} /> Details</CButton>
            <AppModal title="Product Details" size="xl" onClose={onClose} closeOnBackdrop={false} show={visible}>
                {
                    (visible && product_details)? <ProductDetails shouldRefreshState = {[shouldRefresh,setShouldRefresh]} onClose={onClose} loading={loading} />:<div></div>
                }
            </AppModal>
        </>
    )
}

export default ProductDetailsBtn;