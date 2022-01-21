import { CBadge, CButtonGroup } from '@coreui/react';
import LoadingBtn from 'src/components/LoadingBtn';
import { wrequestStatuses } from './../../../../config/app_config/fund_config';


const ActionComponents = (props) => {
    const {onSettleRequest,onCancelRequest,onMarkAsSettled,item} = props;
    
        switch(item.status){
            case wrequestStatuses.pending: return (
                <CButtonGroup>
                    <LoadingBtn data={item.id} onClick={onSettleRequest} color="primary">Settle</LoadingBtn>
                    <LoadingBtn data={item.id} onClick={onMarkAsSettled} color="dark">Mark&nbsp;As&nbsp;Settled</LoadingBtn>
                    <LoadingBtn data={item.id} onClick={onCancelRequest} color="danger">Cancel</LoadingBtn>
                </CButtonGroup>
            );
            case wrequestStatuses.completed: return (
                <CBadge color="success">SETTLED REQUEST</CBadge>
            );
            case wrequestStatuses.cancelled: return (
                <CBadge color="danger">CANCELLED REQUEST</CBadge>
            );
            default: return (
                <CBadge color="danger">UNKNOWN REQUEST</CBadge>
            );
        }
}

export default ActionComponents;
