import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { updateUserCurrency } from "src/redux/actions/AuthActions";
import { fetchCurrencies } from "src/redux/actions/CountryActions";


const SelectCurrencyInput = () => {

    const {id} = useSelector(state => state.auth.currency);
    const [loading,setLoading] = useState(false);
    const {currencies} = useSelector(state => state.country);
    const dispatch = useDispatch();
    const onCurrencyChange = (e) => {
        const value = e.target.value;
        if(value != ""){
            dispatch(updateUserCurrency(value,(val) => setLoading(val)))
        }
    }
    useEffect(() => {
        if(currencies.length == 0){
            dispatch(fetchCurrencies());
        }
    },[])

    return (
        <>
            <Spinner  status={loading} />
            <div>
            <select className="form-control" onChange={onCurrencyChange} value={id} >
                <option value="">Select Currency</option>
                {
                    currencies.map((item,index) => (
                        <option key={"currencies"+index} value={item.id}>{item.currency_code+` (${item.currency_name})`}</option>
                    ))
                }
            </select>
            </div>
        </>
    )
}

export default SelectCurrencyInput;