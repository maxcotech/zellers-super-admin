import { CBadge } from "@coreui/react";
import { getOrderStatusColor, getOrderStatusText } from "src/config/app_config/order_config";
import Money from './../../../components/Money';


const OrderTable = (props) => {
    const {orders} = props;

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
                                    <td><Money>{item.converted_amount}</Money></td>
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