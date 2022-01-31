import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from 'src/redux/actions/AuthActions'
import { Redirect, useHistory } from 'react-router'
import Spinner from 'src/components/Spinner'


const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.app.loading);
  const loggedIn = useSelector(state => state.auth.logged_in);
  const [formState, setFormState] = useState({
    email:"",password:""
  })

  const setFormStateValue = (key,value) => {
    setFormState({
      ...formState,
      [key]:value
    })
  }

  const onSubmit = () => {
    dispatch(loginUser(formState,() => history.push('/dashboard')))
  }
  return (loggedIn === false)?(
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setFormStateValue('email',e.target.value)} type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e) => setFormStateValue('password',e.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton disabled={loading} onClick={() => onSubmit()} color="primary" className="px-4"><Spinner color="text-light" status={loading} /> Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton href="/forgot-password" color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  ): <Redirect to={{pathname:"/dashboard"}} />
}

export default Login
