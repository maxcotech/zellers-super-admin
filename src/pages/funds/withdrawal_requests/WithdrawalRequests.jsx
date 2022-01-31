import { CButton, CCard, CCardBody, CCardHeader, CInputGroup, CInputGroupAppend } from "@coreui/react";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWRequests, defaultWRequestsUrl, getPaymentMethods, setParams, updateRequestStatus, settleSingleRequest, settleMassRequests } from './../../../redux/actions/WRequestActions';
import { useSelector } from 'react-redux';
import Spinner from "src/components/Spinner";
import RequestTable from "./components/RequestTable";
import PaginationComponent from "src/components/PaginationComponent";
import { wrequestStatuses } from './../../../config/app_config/fund_config';
import { toast } from 'react-toastify';
import { confirmAction } from 'src/config/helpers/message_helpers';
import AppModal from "src/components/AppModal";
import MassSettlementForm from "./components/MassSettlementForm";


const WithdrawalRequests = (props) => {
    const dispatch = useDispatch();
    const {params,links,current_link} = useSelector(state => state.wrequest);
    const [gateways,setGateways] = useState([]);
    const [showSettlementForm,setShowSettlementForm] = useState(false);
    const {loading} = useSelector(state => state.app);
    const onPaginationClick = (url) => {
        dispatch(fetchWRequests(url,params));
    }

    const onRefresh = () => {
        dispatch(fetchWRequests(current_link,params));
    }
    const onSettleRequest = async (request_id,iloader = null) => {
        if(await confirmAction({text:"This operation may be irreversible and can change status of financial records."})){
            if(!!params.gateway_id === false){
                toast.error('You need to select a payment method inorder to proceed.');
                return false;
            }
            const data = {
                gateway_id:params.gateway_id,
                request_id
            }
            dispatch(settleSingleRequest(data,iloader,onRefresh));
        }
    }

    const onCancelRequest = async (id,iloader = null) => {
        if(await confirmAction({text:"This operation may be irreversible and can change status of financial records."})){
            const data = {id,status:wrequestStatuses.cancelled};
            dispatch(updateRequestStatus(data,iloader,onRefresh));
        }
    }

    const onMarkAsSettled = async (id,iloader = null) => {
        if(await confirmAction({text:"This operation may be irreversible and can change status of financial records."})){
            const data = {id, status:wrequestStatuses.completed};
            dispatch(updateRequestStatus(data,iloader,onRefresh));        
        }
    }

    const onChangePageStatus = (e) => {
        dispatch(fetchWRequests(defaultWRequestsUrl,{...params,status:e.target.value}));
    }

    const onChangePaymentMethod = (e) => {
        dispatch(setParams({...params,gateway_id:e.target.value}))
    }

    const onSettleMassRequests = (data,iloader) => {
        dispatch(settleMassRequests(data,iloader,() => {
            onRefresh();
            setShowSettlementForm(false);
        }))
    }

    useEffect(() => {
        dispatch(fetchWRequests(defaultWRequestsUrl,params));
        if(gateways.length < 1){
            dispatch(getPaymentMethods(null,(data) => {
                setGateways(data);
            }))
        }
    },[])
    return (
        <>
        <CCard>
            <CCardHeader>
                <h4 className="inline-block"><Spinner status={loading} /> Withdrawal Requests</h4>
               
                <div className="card-header-actions">
                   
                    <CInputGroup>
                        <select onChange={onChangePageStatus} value={params.status ?? ""} className="form-control inline-block">
                            <option value="">All Requests</option>
                            <option value={wrequestStatuses.pending}>Pending Requests</option>
                            <option value={wrequestStatuses.completed}>Completed Requests</option>
                            <option value={wrequestStatuses.cancelled}>Cancelled Requests</option>
                        </select>
                        <select onChange={onChangePaymentMethod} value={params.gateway_id ?? ""} className="form-control inline-block">
                            <option value="">Select Method </option>
                            {
                                gateways.map((item) => (
                                    <option key={item.method_id} value={item.method_id}>{item.method_name}</option>
                                ))
                            }
                        </select>
                        <CInputGroupAppend>
                            <CButton onClick={() => setShowSettlementForm(true)} color="primary">Bulk Settle</CButton>
                        </CInputGroupAppend>

                    </CInputGroup>
                </div>
            </CCardHeader>
            <CCardBody>
                <RequestTable onMarkAsSettled={onMarkAsSettled} onCancelRequest={onCancelRequest} onSettleRequest={onSettleRequest} />
                <div>
                    <PaginationComponent links={links} onClick={onPaginationClick} />
                </div>
            </CCardBody>
        </CCard>
        <AppModal title="Bulk Settlement" show={showSettlementForm} onClose={() => setShowSettlementForm(false)}>
            <MassSettlementForm gateways={gateways} submitHandler={onSettleMassRequests} />
        </AppModal>
        </>
    )
}

export default WithdrawalRequests;