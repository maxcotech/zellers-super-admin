import { CAlert, CBadge, CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { UserRoles } from "src/config/app_config/user_config";
import { confirmAction } from "src/config/helpers/message_helpers";
import { deleteUser, fetchUsers } from "src/redux/actions/UserActions";
import AccountStatusSelect from "./components/AccountStatusSelect";


const Users = (props) => {
    const {status} = useParams();
    const {links,users,current_link} = useSelector(state => state.user);
    const loading = useSelector(state => state.app.loading);
    const dispatch = useDispatch();
    const [filters,setFilters] = useState({
        account_status:status ?? null,
        user_type:null,
        limit:15
    });
    const getUserPhoneNumber = (item) => {
        if(item.telephone_code && item.phone_number){
            return item.telephone_code+item.phone_number;
        } else {
            return "N/A";
        }
    }

    const getUserRoleColor = (user) => {
        switch(user.user_type){
            case UserRoles.customer: return "primary";
            case UserRoles.storeOwner: return "dark";
            case UserRoles.storeStaff: return "secondary";
            case UserRoles.superAdmin: return "success";
            default: return "info";
        }
    }

    const onDeleteUser = async (data,iloader,onComplete) => {
        if(await confirmAction({text:'This user will be permanently deleted.'})){
            dispatch(deleteUser(data,iloader,onComplete))
        }
    }

    useEffect(() => {
        setFilters({
            ...filters,account_status:status ?? null
        });
        dispatch(fetchUsers(current_link,{...filters,account_status:status ?? null}))
    },[status]);

    const onUserTypeChange = (e) => {
        const val = e.target.value;
        setFilters({
            ...filters,
            user_type:val
        });
        dispatch(fetchUsers(current_link,{...filters,user_type:val ?? null}));
    }
    


    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Users</h4> 
                    <div className="card-header-actions">
                        <select onChange={onUserTypeChange} value={filters.user_type ?? ""} className="form-control">
                            <option value="">All Roles</option>
                            <option value={UserRoles.superAdmin}>Super Admin</option>
                            <option value={UserRoles.storeOwner}>Store Owner</option>
                            <option value={UserRoles.storeStaff}>Store Staff</option>
                            <option value={UserRoles.customer}>Customer</option>
                        </select>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (users.length > 0)?
                          <div>
                              <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>First&nbsp;Name</th>
                                                <th>Last&nbsp;Name</th>
                                                <th>Email&nbsp;Address</th>
                                                <th>Phone&nbsp;Number</th>
                                                <th>Account&nbsp;Status</th>
                                                <th>User&nbsp;Role</th>
                                                <th>Date&nbsp;Joined</th>
                                                <th>Verified</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((item,index) => (
                                                    <tr key={"user_"+item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.first_name}</td>
                                                        <td>{item.last_name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{getUserPhoneNumber(item)}</td>
                                                        <td><AccountStatusSelect 
                                                            onComplete={() => dispatch(fetchUsers(current_link,{...filters}))
                                                        } 
                                                            value={item.account_status} user_id={item.id} /></td>
                                                        <td><CBadge color={getUserRoleColor(item)}>{item.user_type_text}</CBadge></td>
                                                        <td>{item.created_at}</td>
                                                        <td>{item.email_verified_at == null? <CBadge color="danger">Not Verified</CBadge>:<CBadge color="success">Verified</CBadge>}</td>
                                                        <td>
                                                            <LoadingBtn
                                                               onComplete={() => dispatch(fetchUsers(current_link,{...filters}))} 
                                                               onClick={onDeleteUser} color="danger" data={item.id}>
                                                                Delete
                                                            </LoadingBtn>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </table>
                              </div>
                              <div>
                                  <PaginationComponent links={links} onClick={(url) => console.log(url)} />
                              </div>
                          </div>:
                          <CAlert color="info">
                              <h4>No Records</h4>
                              <p>Your app does not have any currently registered users in the selected category.</p>
                          </CAlert>
                        
                    }
                </CCardBody>
            </CCard>
        </>
    )
}

export default Users;