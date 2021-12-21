import { CAlert, CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { StoreRoles, UserStatus } from "src/config/app_config/user_config";
import { confirmAction } from "src/config/helpers/message_helpers";
import { fetchStoreStaffs, removeStoreStaff, setFilters, toggleStaffStatus } from "src/redux/actions/StoreStaffsActions";
import StaffPositionSelect from "./components/StaffPositionSelect";

const StoreStaffs = () => {
    const dispatch = useDispatch();
    const {current_link,store_staffs,links,filters} = useSelector(state => state.store_staff);
    const loading = useSelector(state => state.app.loading);

    const onSetFilters = (value,key) => {
        dispatch(setFilters({...filters,[key]:value}));
        dispatch(fetchStoreStaffs(current_link));
    }

    const onRemoveStoreStaff = async (data,iloader) => {
        if(await confirmAction({text:"This action will remove the selected store staff from this store instance."})){
            dispatch(removeStoreStaff(data,iloader))
        }
    }

    useEffect(() => {
        dispatch(fetchStoreStaffs(current_link));
    },[]);

    

    return (
        <CCard>
            <CCardHeader>
                <h4 style={{display:"inline-block"}}><Spinner status={loading} /> Store Staffs</h4>
                <div style={{display:"inline-block"}} className="card-header-actions">
                    <CRow>
                        <CCol>
                            <select value={filters.staff_type} onChange={(e) => onSetFilters(e.target.value,"staff_type")} className="form-control" >
                                <option value="">All Staff Positions</option>
                                <option value={StoreRoles.storeManager}>Store Managers</option>
                                <option value={StoreRoles.storeWorker}>Store Workers</option>
                            </select>
                        </CCol>
                        <CCol>
                            <select onChange={(e) => onSetFilters(e.target.value,"status")} value={filters.status} className="form-control">
                                <option value="">Viewing All Status</option>
                                <option value={UserStatus.active}>View Only Active</option>
                                <option value={UserStatus.inactive}>View Only Inactive</option>
                            </select>
                        </CCol>
                    </CRow>
                </div>
            </CCardHeader>
            <CCardBody>
                {
                    store_staffs.length > 0? 
                    <>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email Address</th>
                                        <th>Phone Number</th>
                                        <th>Position</th>
                                        <th>Access Status</th>
                                        <th>Change Position</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    store_staffs.map((item,index) => {
                                        return (
                                            <tr key={"store_staffs-"+item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.user?.first_name}</td>
                                                <td>{item.user?.last_name}</td>
                                                <td><a href={"mailto:"+item.user?.email}>{item.user?.email}</a></td>
                                                <td>{item.user?.phone_number}</td>
                                                <td>{item.staff_type_text}</td>
                                                <td><CBadge color={item.status === UserStatus.active? "success":"danger"}>{item.status_text}</CBadge></td>
                                                <td><StaffPositionSelect staffType={item.staff_type} staffId={item.id} /></td>
                                                <td>
                                                    <CButtonGroup>
                                                        <LoadingBtn 
                                                            data={item.id}
                                                            onClick={(data,iloading) => dispatch(toggleStaffStatus(data,iloading))}
                                                            color={item.status == UserStatus.active? "success":"dark"}>{item.status == UserStatus.active? "Suspend":"Activate"}</LoadingBtn>
                                                        <LoadingBtn 
                                                            data={item.id}
                                                            onClick={onRemoveStoreStaff}
                                                            color="danger"
                                                        >Remove</LoadingBtn>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <PaginationComponent 
                                links={links}
                                onClick={(url) => dispatch(fetchStoreStaffs(url))}
                            />
                        </div>
                    </>:
                    <CAlert color="info">
                        <h4>Sorry</h4>
                        <p>Could not find any staff account affiliated with this store.</p>
                    </CAlert>
                }
                
            </CCardBody>
        </CCard>
    )
}

export default StoreStaffs;