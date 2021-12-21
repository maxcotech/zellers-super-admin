import { CBadge, CButton, CCard, CCardBody, CFormGroup, CInput, CLabel } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { getOrderStatusText, orderStatuses } from "src/config/app_config/order_config";
import { confirmAction } from "src/config/helpers/message_helpers";
import { changeOrderStatus } from "src/redux/actions/OrderActions";
import PropTypes from "prop-types";
import AppModal from "src/components/AppModal";


const SelectOrderStatus = (props) => {
    const [pendingValue,setPendingValue] = useState(null);
    const keys = Object.keys(orderStatuses);
    const store = useSelector(state => state.store.current_store);
    const dispatch = useDispatch();
    const [viewLockForm,setViewLockForm] = useState(false);
    const [state,setState] = useState({
        new_status:props.value,
        store_id:store?.id,
        sub_order_id:props.id,
        fund_password:null
    });
    const [loading,setLoading] = useState(false);
    const onLockPasswordChange = (e) => {
        setState({...state,fund_password:e.target.value});
    }
    const changeValue = (newState,callback) => {
        dispatch(changeOrderStatus(
            newState,
            callback ,
            (val) => setLoading(val)
        ))
    }

    const onValueChanged = async (e) => {
        const value = e.target.value;
        if(await confirmAction({text:"This action may permanently change the status of the selected order."})){
            if(value == orderStatuses.COMPLETED){
                setPendingValue(value);
                setViewLockForm(true);
            } else {
                const newState = {...state,new_status:value};
                changeValue(newState,() => setState(newState));
            }
        }
    }
    const onFormSubmit = () => {
        const newState = {...state,new_status:pendingValue};
        changeValue(newState,() => setState(newState));
    }

    if(props.value == orderStatuses.COMPLETED || props.value == orderStatuses.CANCELLED || props.value == orderStatuses.REFUNDED){
        return (
            <CBadge color={props.value == orderStatuses.COMPLETED? "success":"danger"}>
                <span className="capitalize">{getOrderStatusText(props.value)}</span>
            </CBadge>
        )
    } else {
        return (
            <>
            <Spinner status={loading} />

            <select value={state.new_status} onChange={onValueChanged} {...props}>
               <option value="" className="capitalize">
                    Select Order Status
               </option>
               {
                   keys.map((key,index) => {
                       if(key !== orderStatuses.REFUNDED){
                           return (
                            <option key={key+"-"+index} className="capitalize" value={orderStatuses[key]}>
                                {getOrderStatusText(orderStatuses[key])}
                            </option>
                           )
                       } else {
                           return <></>
                       }
                   })
               }
            </select>
            <AppModal title="Lock Form" onClose={() => setViewLockForm(false)} show={viewLockForm}>
                <CCard>
                    <CCardBody>
                        <CFormGroup>
                            <CLabel>Enter Fund Password:<span className="text-danger">*</span></CLabel>
                            <CInput onChange={onLockPasswordChange} />
                        </CFormGroup>
                        <CFormGroup>
                            <CButton onClick={onFormSubmit} color="primary">
                               <Spinner status={loading} /> Apply Password
                            </CButton>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            </AppModal>
            </>
        )
    }
}

SelectOrderStatus.propTypes = {
    value:PropTypes.number,
    id:PropTypes.number,

}

export default SelectOrderStatus;