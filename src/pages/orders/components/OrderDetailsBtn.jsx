import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { completeWithOrderItems } from "src/redux/actions/OrderActions";
import OrderDetails from "./OrderDetails";


const OrderDetailsBtn = (props) => {
    const {order} = props;
    const store = useSelector(state => state.store.current_store);
    const [visible,setVisible] = useState(false);
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(false);
    const params = {
        store_id:store.id,
        sub_order_id:order.id,
        paginate:0 //prevent server from returning paginated data
    }
    const dispatch = useDispatch();
    const onComplete = (data) => {
        setItems(data);
        setVisible(true);
    }
    const onViewDetails = () => {
        dispatch(completeWithOrderItems(params,onComplete,(val)=>setLoading(val)))
    }

    return (
        <>
            <AppModal size="xl" title="Order Details" show={visible} onClose={() => setVisible(false)}>
                <OrderDetails items={items} {...props}/>
            </AppModal>
            <CButton onClick={onViewDetails} color="primary">
                <Spinner status={loading}/> View&nbsp;Details
            </CButton>
        </>
    )
}

export default OrderDetailsBtn;