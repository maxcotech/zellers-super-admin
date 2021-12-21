import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'src/components/Spinner';
import { fetchCountries } from 'src/redux/actions/CountryActions';
import { registerUser } from 'src/redux/actions/AuthActions';
import { useHistory } from 'react-router';


const Register = () => {

  const userCountry = useSelector(state => state.auth?.country);
  const [formState,setFormState] = useState({
    first_name:"",last_name:"",phone_number:"",
    email:"",password:"",confirm_password:"",
    telephone_code:userCountry?.country_tel_code ?? "",
    account_type:"",staff_token:""
  });

  const setFormStateValue = (key,val) => {
    setFormState({
      ...formState,
      [key]:val
    })
  }

  const countries = useSelector(state => state.country.countries);
  const loading = useSelector(state => state.app.loading)
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(()=>{
    if(countries.length == 0){
      dispatch(fetchCountries())
    }
  
  },[])

  const onSubmit = () => {
    dispatch(registerUser(formState,() => history.push('/login')));
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CFormGroup>
                    <CRow>
                      <CCol>
                        <input onChange={(e) => setFormStateValue("first_name",e.target.value)} type="text" className="form-control" placeholder="Enter First Name" />
                      </CCol>
                      <CCol>
                        <input onChange={(e) => setFormStateValue("last_name",e.target.value)} type="text" className="form-control" placeholder="Enter Last Name" />
                      </CCol>
                    </CRow>
                  </CFormGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e) => setFormStateValue("email",e.target.value)} type="text" placeholder="Enter Your Email" autoComplete="email" />
                  </CInputGroup>
                 
            <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                    <CSelect value={formState.telephone_code}  onChange={(e) => setFormStateValue("telephone_code",e.target.value)}>
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
                    <CInput value={formState.phone_number} placeholder="Enter Phone Number" type="tel" onChange={(e) => isNaN(e.target.value)? false: setFormStateValue("phone_number",e.target.value)}/>
                  </CInputGroup>
                  
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e) => setFormStateValue("password",e.target.value)} type="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput onChange={(e) => setFormStateValue("confirm_password",e.target.value)} type="password" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect value={formState.account_type}  onChange={(e) => setFormStateValue("account_type",e.target.value)} >
                        <option value="">Select Account Type</option>
                        <option value={12}>Store Owner</option>
                        <option value={11}>Store Manager</option>
                        <option value={10}>Store Worker</option>
                    </CSelect>
                  </CInputGroup>
                  {
                    (formState.account_type == 11 || formState.account_type == 10)?
                    <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                      <CInput value={formState.staff_token} placeholder="Paste Store Staff Token" onChange={(e) => setFormStateValue("staff_token",e.target.value)} />
                      </CInputGroup>:<></>
                  }
                  
                  <CButton onClick={() => onSubmit()} color="success" block><Spinner color="text-light" status={loading} /> Create Account</CButton>
                  <p>Already have a store account? <Link to="/login">Login</Link></p>
                </CForm>
              </CCardBody>
             
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
