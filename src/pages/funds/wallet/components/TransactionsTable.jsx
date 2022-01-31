import { CBadge } from "@coreui/react";
import Money from './../../../../components/Money';


const TransactionsTable = (props) => {
    const {transactions} = props;
    const getFundLockStatus = (order_commission_lock) => {
        if(order_commission_lock !== null){
            return order_commission_lock.status_text
        } 
        return "Unlocked";
    }
    const getFundLockStatusColor = (order_commission_lock) => {
        if(order_commission_lock !== null){
            if(order_commission_lock.status == 1){
                return "success";
            } else {
                return "danger"
            }
        }
        return "success";
    }
    
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Amount</th>
                        <th>Sender&nbsp;Email</th>
                        <th>Sender&nbsp;Type</th>
                        <th>Ledger&nbsp;Type</th>
                        <th>Transaction&nbsp;Type</th>
                        <th>Fund&nbsp;Status</th>
                        <th>Created&nbsp;On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((item,index) => (
                            <tr key={'trx-'+item.id}>
                                <td>{index + 1}</td>
                                <td><Money>{item.amount}</Money></td>
                                <td><a href={"mailto:"+item.sender_email}>{item.sender_email}</a></td>
                                <td>{item.sender_type_text}</td>
                                <td><CBadge color={(item.ledger_type == 1)? "success":"danger" }>{item.ledger_type_text}</CBadge></td>
                                <td>{item.transaction_type_text}</td>
                                <td><CBadge color={getFundLockStatusColor(item.order_commission_lock)}>{getFundLockStatus(item.order_commission_lock)}</CBadge></td>
                                <td>{item.created_at}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable;