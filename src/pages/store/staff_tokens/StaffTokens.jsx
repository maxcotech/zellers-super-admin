import { CAlert, CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardHeader } from "@coreui/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import CopyBox from "src/components/CopyBox";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { createStaffTokens, deleteStaffToken, fetchStaffTokens, toggleStaffTokenExpiry } from "src/redux/actions/StoreStaffTokens";
import StaffTokenForm from "./components/StaffTokenForm";

const StaffTokens = () => {
    const token = useSelector(state => state.staff_token);
    const loading = useSelector(state => state.app.loading);
    const store = useSelector(state => state.store.current_store);
    const dispatch = useDispatch();
    const [visibleModal,setVisibleModal] = useState(false);
    


    useEffect(() => {
        dispatch(fetchStaffTokens())
    },[])

    const onCreateToken = (data) => {
        if(store === null) return;
        data.store_id = store.id;
        dispatch(createStaffTokens(data,() => setVisibleModal(false)));
    }
    return (
        <>
        <CCard>
            <CCardHeader>
                <h4 style={{display:"inline-block"}}><Spinner status={loading} /> Staff Tokens</h4>
                <div style={{display:"inline-block"}} className="card-header-actions">
                    <CButton onClick={() => setVisibleModal(true)} color="primary">+ New Token</CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                {
                    (token.tokens.length > 0)?
                        <div className="table-responsive">
                            <table className="table table-striped" >
                                <thead>
                                <tr>
                                    <th>Token ID</th>
                                    <th>Staff Token</th>
                                    <th>Staff Type</th>
                                    <th>Expiry</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    token.tokens.map(
                                        (item) =>
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td ><CopyBox >{item.staff_token}</CopyBox></td>
                                                <td>{item.staff_type_text}</td>
                                                <td>
                                                    { 
                                                        item.expired === 0? 
                                                            <CBadge color="success">Active</CBadge>:
                                                            <CBadge color="danger">Expired</CBadge>
                                                            
                                                    }
                                                </td>
                                                <td>{item.created_at}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <LoadingBtn 
                                                            color="info" 
                                                            data={item.id}
                                                            onClick={(data,loading) => dispatch(toggleStaffTokenExpiry(data,loading))}
                                                        >
                                                            {item.expired == 0? "Expire":"Re-active"}
                                                        </LoadingBtn>
                                                        <LoadingBtn 
                                                            color="danger" 
                                                            data={item.id}
                                                            onClick={(data,loading) => dispatch(deleteStaffToken(data,loading))}
                                                        >
                                                            Delete
                                                        </LoadingBtn>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                    )

                                }
                                </tbody>
                            </table>
                            <PaginationComponent links={token.links} onClick={(link) => dispatch(fetchStaffTokens(link))} />
                        </div>:
                        <CAlert color="info">
                            <h3>Add New Tokens</h3>
                            <p>Your store do not have any staff token currently. Add new tokens to enable potential employees join your store.</p>
                        </CAlert>
                }
                
            </CCardBody>
        </CCard>
        <AppModal closeOnBackdrop={false} show={visibleModal} title="Create Staff Token" onClose={() => setVisibleModal(false)}>
            <StaffTokenForm onSubmit={onCreateToken} />
        </AppModal>
        </>
    )
}

export default StaffTokens;