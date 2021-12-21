import { CButton, CCol, CFormGroup, CInput, CLabel, CRow, CSelect } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "src/components/Spinner";
import { valueExistsInDataList } from "src/config/helpers/validation_helpers";
import { fetchCountries } from "src/redux/actions/CountryActions";
import { completeWithCities, completeWithStates } from "src/redux/actions/StoreActions";

const StoreForm = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const countries = useSelector(state => state.country.countries);
    const stateListRef = useRef();
    const cityListRef = useRef();
    const [formState,setFormState] = useState(props.defaultData ?? {
        store_name:"",store_email:"",
        store_telephone:"",store_logo:"",
        country_id:"",state:"",city:"",
        store_address:""
    });
    const [states,setStates] = useState(props.states ?? []);
    const [cities,setCities] = useState(props.cities ?? []);
    const submitForm = () => { 
        props.submitHandler(formState);
    }
    useEffect(() => {
        if(countries.length === 0){
            dispatch(fetchCountries());
        }
        if(props.defaultData){
            if(props.defaultData.country_id){
                dispatch(completeWithStates(props.defaultData.country_id,(val) => setStates(val)));
            }
            if(props.defaultData.state && props.defaultData.country_id){
                dispatch(completeWithCities(
                    props.defaultData.country_id,
                    props.defaultData.state,
                    (val) => setCities(val)
                ))
            }
        }
    },[]);

    const onCountryChange = (e) => {
        const countryId = e.target.value;
        setFormStateValue(countryId,'country_id');
        dispatch(completeWithStates(countryId,(val) => setStates(val)));
    }

    const onStateChange = (e) => {
        const stateName = e.target.value;
        setFormStateValue(stateName,'state');
        if(formState.country_id !== ""){
            if(valueExistsInDataList(stateName,stateListRef)){
                dispatch(completeWithCities(
                    formState.country_id,stateName,(val) => setCities(val)
                ))            
            }
        }
    }
    

    const setFormStateValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }
    return (
        <form encType="multipart/form-data">
            <CFormGroup>
                <CLabel>Store Name<span className="text-danger">*</span></CLabel>
                <CInput 
                    placeholder="Enter Store Name"
                    value={formState.store_name} 
                    onChange={(e) => setFormStateValue(e.target.value,'store_name')}  
                />
            </CFormGroup>
            
            <CFormGroup>
                <CRow>
                    <CCol>
                        <CLabel>Store Telephone</CLabel>
                        <CInput 
                            placeholder="Enter Store Telephone number"
                            type="tel"
                            value={formState.store_telephone}
                            onChange={(e) => setFormStateValue(e.target.value,'store_telephone')}
                        />
                    </CCol>
                    {
                        (props.editMode === true)?
                        <></>:<CCol>
                            <CLabel>Store Logo</CLabel>
                            <CInput 
                                type="file"
                                onChange={(e) => 
                                    setFormStateValue(e.target.files[0],'store_logo')}
                            />
                        </CCol>
                    }
                    
                </CRow>
                
            </CFormGroup>
            <CFormGroup>
                <CLabel>Store Email Address</CLabel>
                <CInput 
                    placeholder="Enter Store Email"
                    value={formState.store_email}
                    onChange={(e) => setFormStateValue(e.target.value,'store_email')}
                />
            </CFormGroup>
            <CFormGroup>
                <CLabel>Store Address</CLabel>
                <CInput 
                    placeholder="Enter Store Address"
                    value={formState.store_address}
                    onChange={(e) => setFormStateValue(e.target.value,'store_address')}
                />
            </CFormGroup>
            <CFormGroup>
                <CLabel>Store Country<span className="text-danger">*</span></CLabel>
                <CSelect onChange={onCountryChange} value={formState.country_id}>
                    <option value="">Select Store Country</option>
                    {
                        countries.length > 0?
                            countries.map((item,index) => {
                                return <option key={index} value={item.id}>{item.country_name}</option>
                            }):<option disabled>Loading...</option>
                    }
                </CSelect>
            </CFormGroup>
            <CFormGroup>
                <CLabel>State Located<span className="text-danger">*</span></CLabel>
                <CInput onChange={onStateChange} list="state_list" placeholder="Select State Located" value={formState.state} />
                <datalist ref={stateListRef} id="state_list">
                    {
                        (states.length > 0)? 
                             states.map((item,index) => (
                                 <option key={'state_option-'+index} value={item.state_name} />
                             ))
                            :<option value="Select Country First" />
                    }
                </datalist>
            </CFormGroup>
            <CFormGroup>
                <CLabel>City Located<span className="text-danger">*</span></CLabel>
                <CInput onChange={(e) => setFormStateValue(e.target.value,'city')} list="city_list" placeholder="Select City Located" value={formState.city} />
                <datalist ref={cityListRef} id="city_list">
                    {
                        (cities.length > 0)? 
                             cities.map((item,index) => (
                                 <option key={'city_option-'+index} value={item.city_name} />
                             ))
                            :<option value="Select State First" />
                    }
                </datalist>
            </CFormGroup>
            <CFormGroup>
                <CButton onClick={() => submitForm()} block color="primary"><Spinner status={loading} /> Submit</CButton>
            </CFormGroup>

        </form>
    )
}

export default StoreForm;