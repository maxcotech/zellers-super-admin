import { CAlert, CButton, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupAppend } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExpandableImage from "src/components/ExpandableImage";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { BASE_URL } from "src/config/constants/app_constants";
import { confirmAction } from "src/config/helpers/message_helpers";
import { deleteStore, fetchStores, updateStoreStatus } from "src/redux/actions/StoreActions";
import SelectResourceStatus from "../categories/components/SelectResourceStatus";


const Stores = (props) => {
    const {stores,current_link,links} = useSelector(state => state.store);
    const {status} = useParams();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.app)
    const [filters,setFilters] = useState({
        query:"",
        status:status
    });
    const onChangeItemStatus = (data,iloader) => {
        dispatch(updateStoreStatus(
            data,
            iloader,
            () => dispatch(fetchStores(current_link,filters)))
        )
    }
    const onDeleteItem = async (data,iloader = null) => {
        if(await confirmAction({text:"This store will be permanently deleted."})){
            dispatch(deleteStore(
                data,iloader,
                () => dispatch(fetchStores(current_link,filters))));
        }
    }
    const onQueryChange = (e) => {
        setFilters({
            ...filters,
            query:e.target.value
        })
    }
    useEffect(() => {
        setFilters({
            ...filters,
            status
        });
        dispatch(fetchStores(current_link,{...filters,status:status}))
    },[status]);

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Stores</h4>
                    <div className="card-header-actions">
                        <CInputGroup>
                            <input placeholder="Search Stores" value={filters.query} onChange={onQueryChange} className="form-control"  />
                            <CInputGroupAppend>
                                <CButton onClick={() => dispatch(fetchStores(`${BASE_URL}stores`,filters))} color="primary">Search</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (stores.length > 0)?
                        <div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Store&nbsp;Logo</th>
                                            <th>Store&nbsp;Name</th>
                                            <th>Phone&nbsp;Number</th>
                                            <th>Store&nbsp;Email</th>
                                            <th>Store&nbsp;Address</th>
                                            <th>City&nbsp;Located</th>
                                            <th>State&nbsp;Located</th>
                                            <th>Country</th>
                                            <th>Store&nbsp;Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stores.map((item,index) => (
                                                <tr key={'stores_'+item.id}>
                                                    <td>{index + 1}</td>
                                                    <td><ExpandableImage src={item.store_logo} /></td>
                                                    <td>{item.store_name}</td>
                                                    <td>{item.store_telephone ?? "N/A"}</td>
                                                    <td>{item.store_email ?? "N/A"}</td>
                                                    <td>{item.store_address ?? "N/A"}</td>
                                                    <td>{item.city?.city_name ?? "N/A"}</td>
                                                    <td>{item.state?.state_name ?? "N/A"}</td>
                                                    <td>{item.country?.country_name ?? "N/A"}</td>
                                                    <td><SelectResourceStatus id={item.id} changeHandler={onChangeItemStatus} value={item.store_status} /></td>
                                                    <td><LoadingBtn color="danger" onClick={onDeleteItem} data={item.id}>Delete</LoadingBtn></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>                            
                            </div>
                            <div>
                                <PaginationComponent onClick={(url) => dispatch(fetchStores(url,filters))} links={links} />
                            </div>
                        </div>:
                        <CAlert color="info">
                            <h4>No Stores</h4>
                            <p>Could not find any store within the selected category.</p>
                        </CAlert>
                    }
                </CCardBody>
            </CCard>
        </>
    )
}

export default Stores;