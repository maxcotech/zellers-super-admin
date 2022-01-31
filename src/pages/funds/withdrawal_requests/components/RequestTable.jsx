import { CAlert } from '@coreui/react';
import { useSelector } from 'react-redux';
import Money from './../../../../components/Money';
import ActionComponents from './ActionComponents';

const RequestTable = (props) => {
    const {requests} = useSelector(state => state.wrequest);
   
    return (
        <>

        {
            (requests.length > 0)?
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Store&nbsp;Name</th>
                            <th>Store&nbsp;Email</th>
                            <th>Bank&nbsp;Name</th>
                            <th>Account&nbsp;Number</th>
                            <th>Bank&nbsp;Code</th>
                            <th>Bank&nbsp;Currency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((item,index) => (
                                <tr key={"requests_"+item.id}>
                                    <th>{index + 1}</th>
                                    <td><Money>{item.amount}</Money></td>
                                    <td>{item.reference}</td>
                                    <td>{item.store?.store_name ?? "N/A"}</td>
                                    <td><a href={"mailto:"+(item.store?.store_email ?? "N/A")}>{item.store?.store_email ?? "N/A"}</a></td>
                                    <td>{item.bank?.bank_name ?? "N/A"}</td>
                                    <td>{item.bank?.account_number ?? "N/A"}</td>
                                    <td>{item.bank?.bank_code ?? "N/A"}</td>
                                    <td>{(item.bank)? item.bank?.currency?.currency_name+" ("+item.bank?.currency?.currency_code+")":"N/A"}</td>
                                    <td>
                                        <ActionComponents {...props} item={item} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>:
            <CAlert color="info">
                <h4>Not Found</h4>
                <p>Could not find any withdrawal requests within the selected constraints.</p>
            </CAlert>
        }
       
        </>
    )
}

export default RequestTable;