import {CCard,CCardBody,CCardHeader,CButton, CAlert, CButtonGroup} from "@coreui/react";
import {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { deleteShippingLocation, fetchShippingLocations } from "src/redux/actions/ShippingLocationActions";
import CreateShippingLocation from "./components/CreateShippingLocation";
import UpdateShippingLocation from "./components/UpdateShippingLocation";


const ShippingLocations = (props) => {
    const [visible,setVisible] = useState(false);
    const [shipping_group_id,setShippingGroupId] = useState();
    const {shipping_locations,links} = useSelector(state => state.shipping_location);
    const {loading} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const onClickBtn = (group_id,iloader) => {
        setShippingGroupId(group_id);
        dispatch(fetchShippingLocations(
            {shipping_group_id:group_id},
            null,
            iloader,
            () => setVisible(true)
        ))
    }

    const onDeleteLocation = async (data,iloader) => {
        if(await confirmAction({text:"This operation will permanently delete the selected shipping location."})){
            dispatch(deleteShippingLocation(data,props.group_id,iloader));
        }
    }

    return (
        <>
            <AppModal title="Manage Shipping Locations" onClose={()=>setVisible(false)} show={visible}  size="lg">
                <CCard>
                    <CCardHeader>
                        <h4 className="inline-block"><Spinner status={loading} /> {props.title ?? "Shipping Locations"}</h4>
                        <div className="card-header-actions">
                            <CreateShippingLocation group_id={props.group_id} />
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        {
                            (shipping_locations.length > 0)?
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead color="dark">
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Country Name</th>
                                                    <th>State Name</th>
                                                    <th>City Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    shipping_locations.map((item,index) => (
                                                        <tr key={"shipping_locations"+item.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.country?.country_name ?? "N/A"}</td>
                                                            <td>{item.state?.state_name ?? "N/A"}</td>
                                                            <td>{item.city?.city_name ?? "N/A"}</td>
                                                            <td>
                                                                <CButtonGroup>
                                                                    <LoadingBtn 
                                                                        data={item.id}
                                                                        onClick={onDeleteLocation}
                                                                        color="danger"
                                                                    >
                                                                        Delete
                                                                    </LoadingBtn>
                                                                    <UpdateShippingLocation defaultData={item} group_id={item.shipping_group_id} />
                                                                </CButtonGroup>
                                                            </td>
                                                        </tr>
                                                    )) 
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <PaginationComponent 
                                            onClick={(url) => dispatch(fetchShippingLocations({shipping_group_id},url))} 
                                            links={links} 
                                        />
                                    </div>
                                </div>:
                                <CAlert color="info">
                                    <h4>No Shipping Location</h4>
                                    <p>You don't have any shipping location allocated to the selected shipping group.</p>
                                </CAlert>
                        }
                    </CCardBody>
                </CCard>
            </AppModal>
            <LoadingBtn color="dark" data={props.group_id} onClick={onClickBtn}>{props.children}</LoadingBtn>
        </>
    )
}

export default ShippingLocations;