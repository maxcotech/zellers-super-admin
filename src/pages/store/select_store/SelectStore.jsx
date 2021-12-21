import { CAlert, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CInput, CRow } from "@coreui/react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircleAvatar from "src/components/CircleAvatar";
import { setCurrentStore } from "src/redux/actions/StoreActions";
import { useHistory } from "react-router";
import Spinner from "src/components/Spinner";

const SelectStore = () => {

    const store = useSelector(state => state.store);
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.app.loading);
    const onSelectStore = (store) => {
        dispatch(setCurrentStore(store,() => history.push('/dashboard')));
    }


    return (
        <div>
            <CRow>
                <CCol lg={{ size: 8, offset: 2 }}>
                    <CCard>
                        <CCardHeader>
                            <h3><Spinner status={loading} /> Select A Store To Continue</h3>
                        </CCardHeader>
                        <CCardBody>

                            <div className="table-responsive">
                                
                                {
                                    (store.stores.length > 0) ?
                                    <table className="table hover">
                                        {
                                         store.stores.map((item, index) => {
                                            return (
                                            <tr className="hoverable" key={index} onClick={() => onSelectStore(item)}>
                                                <td>
                                                    <CircleAvatar
                                                        src={item.store_logo}
                                                        radius={60}
                                                    />
                                                </td>
                                                <td>
                                                    <h4>{item.store_name}</h4>
                                                    <p>{item.store_address}</p>
                                                </td>
                                                <td>
                                                    <CInput type="checkbox" checked={(item.id === store.current_store?.id) ? true : false} />
                                                </td>

                                            </tr>)

                                        })}
                                        </table>
                                        :
                                        <CAlert color="info">You do not have list of stores to select from.</CAlert>
                                }
                            </div>
                        </CCardBody>
                        <CCardFooter>
                            Have a store token ? <Link to="/dashboard">Join Store</Link>.
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </div>

    )
}

export default SelectStore;