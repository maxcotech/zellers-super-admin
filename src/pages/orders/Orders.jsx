import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderStatusText } from "src/config/app_config/order_config";
import { CCard, CCardHeader, CCardBody, CAlert, CButton, CBadge } from "@coreui/react";
import { fetchOrders } from "src/redux/actions/OrderActions";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import HtmlEntity from "src/components/HtmlEntity";
import PaginationComponent from "src/components/PaginationComponent";
import OrderDetailsBtn from "./components/OrderDetailsBtn";
import SelectOrderStatus from "./components/SelectOrderStatus";


const Orders = (props) => {
    const {order_status} = useParams();
    const dispatch = useDispatch();
    const store = useSelector(state => state.store.current_store);
    const {current_link,orders,links} = useSelector(state => state.order);
    const {currency_sym} = useSelector(state => state.auth.currency);
    const loading = useSelector(state => state.app.loading);
    const [viewState,setViewState] = useState({
        status:order_status,
        store_id:store.id,
    });

    useEffect(() => {
        dispatch(fetchOrders(current_link,{...viewState,status:order_status}))
    },[order_status])

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4><Spinner status={loading} /> <span className="capitalize">{getOrderStatusText(order_status)} Orders</span></h4>
                </CCardHeader>
                <CCardBody>
                    {
                        (orders.length > 0)? 
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Order No</th>
                                                <th>Customer&nbsp;Name</th>
                                                <th>Customer&nbsp;Email</th>
                                                <th>Amount</th>
                                                <th>Shipping&nbsp;Fee</th>
                                                <th>Order&nbsp;Status</th>
                                                <th>Payment&nbsp;Status</th>
                                                <th>Created&nbsp;On</th>
                                                <th>Expected&nbsp;On</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((item,index) => (
                                                    <tr key={"store_orders_"+item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.order.order_number}</td>
                                                        <td>{item.user.first_name+" "+item.user.last_name}</td>
                                                        <td>{item.user.email}</td>
                                                        <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.amount}</td>
                                                        <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.shipping_fee}</td>
                                                        <td><SelectOrderStatus className="capitalize" id={item.id} value={item.status} /></td>
                                                        <td><CBadge color={item.payment_status == 1? "success":"danger"}>{item.payment_status_text}</CBadge></td>
                                                        <td>{item.created_at}</td>
                                                        <td>{item.delivery_date}</td>
                                                        <td><OrderDetailsBtn order={item} /></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                       
                                    </table>
                                </div>
                                <div>
                                    <PaginationComponent
                                        links={links}
                                        onClick={(url) => dispatch(fetchOrders(url,viewState))}
                                    />
                                </div>
                            </div>:
                            <CAlert color="primary">
                                <h4 className="capitalize">No {getOrderStatusText(order_status)} Orders</h4>
                                <p>You may not yet have any recorded order under the selected order status category.</p>
                            </CAlert>
                    }
                </CCardBody>
            </CCard>
        </>
    )
}

export default Orders;