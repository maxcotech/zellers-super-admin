import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import HtmlEntity from "src/components/HtmlEntity";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { createShippingGroups, deleteShippingGroup, fetchShippingGroups } from "src/redux/actions/ShippingGroupActions";
import ShippingLocations from "../shipping_locations/ShippingLocations";
import DimensionRatesModal from "./components/DimensionRatesModal";
import ShippingGroupForm from "./components/ShippingGroupForm";
import UpdateShippingGroup from "./components/UpdateShippingGroup";

const ShippingGroups = () => {

    const dispatch = useDispatch();
    const { links, shipping_groups } = useSelector(state => state.shipping_group);
    const {currency_sym} = useSelector(state => state.auth.currency);
    const {loading} = useSelector(state => state.app);
    const [showForm,setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchShippingGroups());
    }, []);

    const onCreateShippingGroup = (formData) => {
        dispatch(createShippingGroups(formData,() => setShowForm(false)))
    }
    const onDeleteShippingGroup = async (data,iloader) => {
        if(await confirmAction({text:"This operation will permanently delete the selected shipping group."})){
            dispatch(deleteShippingGroup(data,iloader));
        }
    }

    return (
        <>
        <CCard>
            <CCardHeader>
                <h4 className="inline-block"><Spinner status={loading} /> Shipping Groups</h4>
                <div className="card-header-actions inline-block">
                    <CButton onClick={() => setShowForm(true)} color="primary">+ Add Shipping Group</CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                {
                    (shipping_groups.length > 0) ?
                        <div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Group Name</th>
                                            <th>Delivery (in days)</th>
                                            <th>Shipping Rate</th>
                                            <th>High Value Rate</th>
                                            <th>Mid Value Rate</th>
                                            <th>Low Value Rate</th>
                                            <th>Door Delivery Rate</th>
                                            <th>Dimensions Rate</th>
                                            <th>Actions</th>
                                            <th>Locations</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            shipping_groups.map((item,index) => (
                                                <tr key={'shipping_group_'+item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.group_name}</td>
                                                    <td>{item.delivery_duration+" Days"}</td>
                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.shipping_rate}</td>
                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.high_value_rate}</td>
                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.mid_value_rate}</td>
                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.low_value_rate}</td>
                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.door_delivery_rate}</td>
                                                    <td><DimensionRatesModal data={item.dimension_range_rates} color="dark">Dimension&nbsp;Rates</DimensionRatesModal></td>
                                                    <td>
                                                        <CButtonGroup>
                                                            <LoadingBtn
                                                                data={item.id}
                                                                onClick={onDeleteShippingGroup}
                                                                color="danger"
                                                            >
                                                                Delete
                                                            </LoadingBtn>
                                                            <UpdateShippingGroup data={item} color="primary">
                                                                Update
                                                            </UpdateShippingGroup>
                                                        </CButtonGroup>
                                                    </td>
                                                    <td>
                                                        <ShippingLocations 
                                                            title={item.group_name}
                                                            group_id={item.id}
                                                        >
                                                            View&nbsp;Locations
                                                        </ShippingLocations>
                                                    </td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <PaginationComponent 
                                    links={links}
                                    onClick={(path) => dispatch(fetchShippingGroups(path))}
                                />
                            </div>
                        </div> :
                        <CAlert color="info">
                            <h4>No Shipping Group</h4>
                            <p>You dont have any shipping group yet, proceed to create them.</p>
                        </CAlert>
                }

            </CCardBody>
        </CCard>
        <AppModal closeOnBackdrop={false} show={showForm} title="Create Shipping Group" onClose={() => setShowForm(false)}>
            <CCard>
                <CCardBody>
                    <ShippingGroupForm submitHandler={onCreateShippingGroup} />
                </CCardBody>
            </CCard>
        </AppModal>
        </>
    )
}

export default ShippingGroups;