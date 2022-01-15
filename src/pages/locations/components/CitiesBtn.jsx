import { CButton } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { fetchPaginatedCities } from "src/redux/actions/CityActions";
import Cities from "./Cities";


const CitiesBtn = (props) => {
    const {state} = props;
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const {params} = useSelector(state => state.city);
    const dispatch = useDispatch();
    const onBtnClick = () => {
        dispatch(fetchPaginatedCities(
            null,{...params,state_id:state.id},setLoading,() => {
                setVisible(true);
            }
        ))
    }

    return (
        <>
            <CButton onClick={onBtnClick} color="light"><Spinner status={loading} /> Cities</CButton>
            <AppModal size="lg" onClose={() => setVisible(false)} show={visible} title={"Cities In "+state.state_name}>
                {
                    (visible)? <Cities state={state} />:<></>
                }
            </AppModal>
        </>
    )
}

export default CitiesBtn;