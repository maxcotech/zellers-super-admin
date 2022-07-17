import { CCard, CCardBody, CCardFooter, CInput, CInputGroup, CInputGroupPrepend, CLabel, CSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingBtn from "src/components/LoadingBtn";
import { fetchCountries } from "src/redux/actions/CountryActions";
import { createAdminAccount } from "src/redux/actions/UserActions";

const CreateAdminForm = ({onComplete}) => {
    const countries = useSelector(state => state.country.countries);
    const dispatch = useDispatch();
    const [formState,setFormState] = useState({
        first_name : "",
        last_name : "",
        email : "",
        phone_number : "",
        telephone_code : "",
        password : ""
    });

    const setFormValue = (val,key) => {
        setFormState({
            ...formState,
            [key]: val
        })
    }

    useEffect(()=>{
        if(countries.length == 0){
          dispatch(fetchCountries())
        }
    },[])

    const onSubmit = (_,iloader) => {
        dispatch(createAdminAccount(formState,iloader,onComplete))
    }
    

    return (
        <CCard>
            <CCardBody>
                <div className="form-group">
                    <CLabel>First Name</CLabel>
                    <CInput onChange={(e) => setFormValue(e.target.value,"first_name")} value={formState.first_name} placeholder="Enter Admin First Name"  />
                </div>
                <div className="form-group">
                    <CLabel>Last Name</CLabel>
                    <CInput onChange={(e) => setFormValue(e.target.value,"last_name")} value={formState.last_name} placeholder="Enter Admin Last Name"  />
                </div>
                <div className="form-group">
                    <CLabel>Email Address</CLabel>
                    <CInput value={formState.email} onChange={(e) => setFormValue(e.target.value,"email")} type="email" placeholder="Enter Admin Email Address"  />
                </div>
                <div className="form-group">
                    <CLabel>Phone Number</CLabel>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CSelect value={formState.telephone_code}  onChange={(e) => setFormValue(e.target.value,"telephone_code")}>
                        {
                            (countries.length > 0)?
                            countries.map((item,index) => {
                                return (<option key={index} value={item.country_tel_code}>
                                {item.country_code+" ("+item.country_tel_code+")"}
                                </option>)
                            }):<option value="">Loading Countries...</option>
                        }
                        </CSelect>
                        </CInputGroupPrepend>
                        <CInput value={formState.phone_number} placeholder="Enter Phone Number" type="tel" onChange={(e) => isNaN(e.target.value)? false: setFormValue(e.target.value,"phone_number")}/>
                    </CInputGroup>
                    <div className="form-group">
                        <CLabel>Choose Password (Optional)</CLabel>
                        <CInput onChange={(e) => setFormValue(e.target.value,"password")} value={formState.password} type='password' placeholder="Choose A Password For Admin"  />
                    </div>
                </div>
            </CCardBody>
            <CCardFooter>
                <LoadingBtn data={null} onClick={onSubmit} color="primary">Submit</LoadingBtn>
            </CCardFooter>
        </CCard>
    )
}

export default CreateAdminForm;