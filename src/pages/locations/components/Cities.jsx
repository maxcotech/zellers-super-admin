import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupAppend } from "@coreui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import SelectResourceStatus from "src/components/SelectResourceStatus";
import Spinner from "src/components/Spinner";
import { createCity, deleteCity, fetchPaginatedCities, updateCityStatus } from "src/redux/actions/CityActions";
import AppModal from "src/components/AppModal";
import CitiesForm from "./CitiesForm";
import { useState } from "react";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";
import UpdateCityBtn from "./UpdateCityBtn";
import { confirmAction } from "src/config/helpers/message_helpers";


const Cities = (props) => {
    const {state} = props;
    const {cities,params,current_link,links} = useSelector(state => state.city);
    const [showCreateForm,setShowCreateForm] = useState(false);
    const {loading} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const resourceStatusKeys = Object.keys(resourceStatus);
    const onPaginationClick = (url) => {
        dispatch(fetchPaginatedCities(url,params))
    }
    const onCreateCity = (data,iloader = null) => {
        dispatch(createCity(data,iloader,() => {
            dispatch(fetchPaginatedCities(current_link,params));
            setShowCreateForm(false);
        }))
    }
    const onPageStatusChange = (e) => {
        const val = e.target.value;
        dispatch(fetchPaginatedCities(null,{...params,status:val}))
    }
    const onItemStatusChange = (data,iloader = null) => {
        dispatch(updateCityStatus(data,iloader,() => {
            dispatch(fetchPaginatedCities(current_link,params));
        }))
    }
    const onCompleteItemUpdate = () => {
        dispatch(fetchPaginatedCities(current_link,params));
    }
    const onDeleteItem = async (data,iloader = null) => {
        if(await confirmAction({text:"Things may break, resources that rely on the selected city may become unstable."})){
            dispatch(deleteCity(data,iloader,() => {
                dispatch(fetchPaginatedCities(current_link,params));
            }))
        }
    }

    return (
        <> 
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> City List</h4>
                    <div className="card-header-actions">
                        <CInputGroup>
                            <select onChange={onPageStatusChange} value={params?.status ?? ""} className="form-control">
                                <option value="">Select Status</option>
                                {
                                    resourceStatusKeys.map((key) => {
                                        return <option value={resourceStatus[key]} key={"res_"+key}>{normalizeSnakeCasing(key)}</option>
                                    })
                                }
                            </select>
                            <CInputGroupAppend>
                                <CButton onClick={() => setShowCreateForm(true)} color="primary">+ Add City</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                    </div>
                </CCardHeader>
                <CCardBody>
                   {
                       (cities.length > 0)?
                       <div className="table-responsive">
                           <table className="table table-striped">
                               <thead>
                                   <tr>
                                       <th>S/N</th>
                                       <th>City Name</th>
                                       <th>City Code</th>
                                       <th>Status</th>
                                       <th>Actions</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {
                                       cities.map((item,index) => (
                                           <tr key={"cities_"+item.id}>
                                               <th>{index + 1}</th>
                                               <td>{item.city_name}</td>
                                               <td>{item.city_code ?? "N/A"}</td>
                                               <td><SelectResourceStatus id={item.id} changeHandler={onItemStatusChange} value={item.status} /></td>
                                               <td>
                                                   <CButtonGroup>
                                                       <UpdateCityBtn onComplete={onCompleteItemUpdate} city={item} />
                                                       <LoadingBtn onClick={onDeleteItem} data={item.id} color="danger">Delete</LoadingBtn>
                                                   </CButtonGroup>
                                               </td>
                                           </tr>
                                       ))
                                   }
                               </tbody>
                           </table>
                       </div>:
                       <CAlert color="info">
                           <h4>No Cities</h4>
                           <p>Could not find any city under the selected state and status.</p>
                           <div><CButton onClick={() => setShowCreateForm(true)} color="primary">+ Add City</CButton></div>
                       </CAlert>
                   }
                   <div>
                       <PaginationComponent onClick={onPaginationClick} links={links} />
                   </div>
                </CCardBody>
            </CCard>
            <AppModal title="Create City" show={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <CitiesForm defaultData={{state_id:state.id}} submitHandler={onCreateCity} />
            </AppModal>
            
        </>
    )
}

export default Cities;