import { CButton, CCard, CCardBody, CFormGroup, CLabel, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { fetchCountries } from "src/redux/actions/CountryActions";
import { completeWithCities, completeWithStates } from "src/redux/actions/StoreActions";


const ShippingLocationForm = (props) => {
    const {countries} = useSelector(state => state.country);
    const {loading} = useSelector(state => state.app);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const dispatch = useDispatch();
    const getDefaultData = () => {
        if(!props.defaultData){
            return null;
        }
        const data = props.defaultData;
        return {
            id:data.id,
            store_id:data.store_id,
            country_id: data.country_id,
            state: data.state?.state_name ?? "",
            city: data.city?.city_name ?? "",
            shipping_group_id:props.group_id
        }
    }
    const [formState,setFormState] = useState(getDefaultData() ?? {
        shipping_group_id:props.group_id,
        country_id:"",state:"",city:""
    })

    const setFormStateValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }

    useEffect(() => {
        if(countries.length === 0){
            dispatch(fetchCountries())
        }
        if(formState.country_id !== "" && formState.country_id !== null && states.length === 0){
            dispatch(completeWithStates(formState.country_id,(data) => setStates(data)))
        }
        if(formState.country_id !== "" && formState.country_id !== null && formState.state !== "" && formState.state !== null && cities.length === 0){
            dispatch(completeWithCities(formState.country_id,formState.state,(data) => setCities(data)));
        }
    },[]);

    const onCountryChange = (value) => {
        setFormStateValue(value,"country_id");
        dispatch(completeWithStates(value,(val) => {
            setStates(val);
            console.log(val);
        }))
    }

    const onStateChange = (value) => {
        setFormStateValue(value,'state');
        dispatch(completeWithCities(formState.country_id,value, (data) => {setCities(data);}))
    }

    const onCityChange = (value) => {
        setFormStateValue(value,'city');
    }

    const onFormSubmit = () => {
        props.submitHandler(formState)
    }

    return (
        <CCard>
            <CCardBody>
                <form>
                <CFormGroup>
                    <CLabel>Country<span className="text-danger">*</span></CLabel>
                    <CSelect onChange={(e) => onCountryChange(e.target.value)}  value={formState.country_id}>
                        {
                            (countries.length > 0)?
                                <>
                                    <option value="">Select Country</option>
                                    {
                                        countries.map((item,index) => (
                                            <option key={'hind'+index} value={item.id}>{item.country_name}</option>
                                        ))
                                    }
                                </>
                                :
                                <option value="">Loading countries...</option>
                        }
                    </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CLabel for="target_state">Target State<span className="text-danger">*</span></CLabel>
                    <CSelect id="target_state" onChange={(e) => onStateChange(e.target.value)}  value={formState.state} >
                    <option value="">Select Target State</option>
                        {
                            (states.length > 0)? 
                            <>
                                {
                                states.map((item,index) => (
                                    <option key={index} value={item.state_name}>{item.state_name}</option>
                                ))
                                }
                            </>:
                            <option value="">Select Country to load States.</option>
                        }
                    
                    </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Target City/Area</CLabel>
                    <CSelect  onChange={(e) => onCityChange(e.target.value)}  value={formState.city} >
                    <option value="">Select Target City/Area</option>
                        {
                            (cities.length > 0)? 
                                <>
                                    {
                                        cities.map((item,index) => (
                                            <option key={"citi-"+index} value={item.city_name}>{item.city_name}</option>
                                        ))
                                    }
                                </>:
                            <option value="">Select state to load cities</option>
                        }
                   </CSelect>
                </CFormGroup>
                <CFormGroup>
                    <CButton onClick={onFormSubmit} block={true} color="primary">
                      <Spinner status={loading}/> Submit
                    </CButton>
                </CFormGroup>
                </form>
            </CCardBody>
        </CCard>
    )
} 

export default ShippingLocationForm;