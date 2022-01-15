import { CButton } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { defaultPaginatedStateUrl, fetchPaginatedStates } from "src/redux/actions/StateActions";
import States from "./States";


const StatesBtn = (props) => {
    const {country} = props;
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {params} = useSelector(state => state.state);
    const onBtnClick = () => {
        dispatch(fetchPaginatedStates(
            null,{...params,country_id:country.id},
            setLoading,() => setVisible(true)
        ));
    }
    return (
        <>
            <CButton onClick={onBtnClick} color="light"><Spinner status={loading} /> States</CButton>
            <AppModal size="lg" onClose={() => setVisible(false)} show={visible} title={`States In ${country.country_name}`}>
                {
                    (visible === true)?
                    <States country={country} />:<></>
                }
            </AppModal>
        </>
    )
}

export default StatesBtn;