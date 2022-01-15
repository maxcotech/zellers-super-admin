import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupAppend, CInputGroupPrepend } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import SelectResourceStatus from "src/components/SelectResourceStatus";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";
import { createState, deleteState, fetchPaginatedStates, updateStateStatus } from "src/redux/actions/StateActions";
import CitiesBtn from "./CitiesBtn";
import StatesForm from "./StatesForm";
import UpdateStateBtn from "./UpdateStateBtn";

const States = (props) => {
    const {country} = props;
    const {loading} = useSelector(state => state.app);
    const {states,links,params,current_link} = useSelector(state => state.state);
    const [visibleForm,setVisibleForm] = useState(false);
    const dispatch = useDispatch();
    const resourceKeys = Object.keys(resourceStatus);
    const onPaginationClick = (url) => {
        dispatch(fetchPaginatedStates(url,params));
    }
    const onChangeItemStatus = (data,iloader = null) => {
        dispatch(updateStateStatus(data,iloader,() => {
            dispatch(fetchPaginatedStates(current_link,params));
        }))
    }
    const onCreateState = (data,iloader) => {
        dispatch(createState(data,iloader,() => {
            dispatch(fetchPaginatedStates(current_link,params,iloader,() => {
                setVisibleForm(false);
            }))
        }))
    }
    const onChangePageStatus = (e) => {
        const val = e.target.value;
        console.log({...params,status:val});
        dispatch(fetchPaginatedStates(null,{...params,status:val}));
    }
    const onDeleteItem = async (data,iloader = null) => {
        if(await confirmAction({text:"Things may break and resources that depends on the selected state may become unstable."})){
            dispatch(deleteState(data,iloader,() => {
                dispatch(fetchPaginatedStates(current_link,params))
            }))
        }
    } 

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading}  /> State List</h4>
                    <div className="card-header-actions">
                        <CInputGroup>
                            <select value={params.status ?? ""} onChange={onChangePageStatus} className="form-control">
                                <option value="">Select Status</option>
                                {
                                    resourceKeys.map((key) => (
                                        <option key={key} value={resourceStatus[key]}>{normalizeSnakeCasing(key)}</option>
                                    ))
                                }
                            </select>
                            <CInputGroupAppend>
                                <CButton onClick={() => setVisibleForm(true)} color="primary">+ Add State</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (states.length > 0)? 
                            <div className="table-responsive">
                                <table className="table table-striped" >
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>State Name</th>
                                            <th>State Code</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                            <th>Attributes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           states.map((item,index) => (
                                               <tr key={"state_"+item.id}>
                                                   <th>{index + 1}</th>
                                                   <td>{item.state_name}</td>
                                                   <td>{item.state_code ?? "N/A"}</td>
                                                   <td><SelectResourceStatus changeHandler={onChangeItemStatus} id={item.id} value={item.status}/> </td>
                                                   <td>
                                                       <CButtonGroup>
                                                           <UpdateStateBtn onComplete={() => dispatch(fetchPaginatedStates(current_link,params))} state={item} />
                                                           <LoadingBtn onClick={onDeleteItem} data={item.id} color="danger">Delete</LoadingBtn>
                                                       </CButtonGroup>
                                                   </td>
                                                   <td>
                                                       <CitiesBtn state={item} />
                                                   </td>
                                               </tr>
                                           ))
                                        }
                                    </tbody>
                                </table>
                            </div>:
                            <CAlert color="info">
                                <h4>Not Found</h4>
                                <p>There are not state under the selected country</p>
                                <div><CButton onClick={() => setVisibleForm(true)} color="primary">+ Add State</CButton></div>
                            </CAlert>

                    }
                    <div>
                        <PaginationComponent onClick={onPaginationClick} links={links} />
                    </div>
                </CCardBody>
            </CCard>
            <AppModal title="Create State" show={visibleForm} onClose={() => setVisibleForm(false)}>
                <StatesForm submitHandler={onCreateState} defaultData={{country_id:country.id}} />
            </AppModal>
        </>
    )
}

export default States;