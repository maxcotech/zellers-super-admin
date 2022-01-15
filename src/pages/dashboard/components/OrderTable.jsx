import { CBadge } from "@coreui/react";
import { useSelector } from "react-redux";
import HtmlEntity from "src/components/HtmlEntity";
import { getOrderStatusColor, getOrderStatusText } from "src/config/app_config/order_config";


const OrderTable = (props) => {
    const {orders} = props;
    const {currency_sym} = useSelector(state => state.auth.currency);

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Order Number</th>
                            <th>Total Amount</th>
                            <th>Creation Date</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((item,index) => (
                                <tr key={'order_'+item.id}>
                                    <th>{index + 1}</th>
                                    <td>{item.user?.first_name+" "+item.user?.last_name}</td>
                                    <td><a href={`mailto:${item.user?.email}`}>{item.user?.email}</a></td>
                                    <td>{item.order_number}</td>
                                    <td><HtmlEntity>{currency_sym+item.converted_amount}</HtmlEntity></td>
                                    <td>{item.created_at}</td>
                                    
                                    <td><CBadge color={getOrderStatusColor(item.status)}>{getOrderStatusText(item.status)}</CBadge></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderTable;