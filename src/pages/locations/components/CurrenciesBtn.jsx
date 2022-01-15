import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { fetchCurrencies } from "src/redux/actions/CountryActions";
import Currencies from "./Currencies";


const CurrenciesBtn = (props) => {
    const {country} = props;
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const onBtnClick = () => {
        dispatch(fetchCurrencies({country_id:country.id},setLoading,() => {
            setVisible(true);
        }))
    }
    return (
        <>
            <AppModal size="lg" onClose={() => setVisible(false)} show={visible} title={"Currencies In "+country.country_name}>
                {
                    (visible)? <Currencies country={country} />:<></>
                }
            </AppModal>
            <CButton onClick={onBtnClick} disabled={loading} color="dark"><Spinner color="light" status={loading} /> Currencies</CButton>

        </>
    )
}

export default CurrenciesBtn;