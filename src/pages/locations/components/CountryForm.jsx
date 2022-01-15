import { CButton, CCard, CCardBody, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { uploadCountryLogo } from "src/redux/actions/CountryActions";


const CountryForm = (props) => {
    const {defaultData,submitHandler} = props;
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formState,setFormState] = useState(defaultData ?? {
        country_name:"",
        country_code:"",
        country_logo:"",
        country_tel_code:""
    });
    const setFValue = (value,key) => {
        setFormState({
            ...formState,
            [key]: value
        })
    }
    const onFileChange = (e) => {
        const file = e.target.files[0];
        setFValue(file,"country_logo");
        if(formState.id){
            const data = new FormData(); 
            data.append('country_id',formState.id);
            data.append('country_logo',file);
            dispatch(uploadCountryLogo(data,setLoading))
        }
    }
    const onSubmit = () => {
        submitHandler(formState,setLoading);
    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <CFormGroup>
                        <CLabel>Country Name</CLabel>
                        <input placeholder="Enter Country Name" onChange={(e) => setFValue(e.target.value,"country_name")} className="form-control" value={formState.country_name} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Country Code</CLabel>
                        <input placeholder="Enter Country Code" onChange={(e) => setFValue(e.target.value,"country_code")} className="form-control" value={formState.country_code} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Country Tel Code</CLabel>
                        <input placeholder="Enter Country Tel Code Eg: +234" onChange={(e) => setFValue(e.target.value,"country_tel_code")} className="form-control" value={formState.country_tel_code} />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Country Logo</CLabel>
                        <input onChange={onFileChange} type="file"  className="form-control" />
                    </CFormGroup>
                    <CButton onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                </CCardBody>
            </CCard>
        </>
    )
}

export default CountryForm;