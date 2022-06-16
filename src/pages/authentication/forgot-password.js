import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import React from 'react'
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from 'src/components/Spinner';
import { resetPasswordComplete, sendForgotPasswordToken } from 'src/redux/actions/AuthActions';

function ForgotPassword() {
    const dispatch = useDispatch();
    const email = localStorage.getItem("user_email");
    const loading = useSelector((state) => state.app.loading);
    const [formState, setFormStateValue] = React.useState({});
    const [resend, setResend] = React.useState(false);
    const history = useHistory();


    const handler = (key, val) => {
        setFormStateValue({ ...formState, [key]: val })
    }
    React.useEffect(() => {
        if (email) {
            handler("email", email);
        } else {
            history.goBack();
        }
    }, []);

    async function Completionist() {

        if (email) {
            const data = { email: email }
            dispatch(sendForgotPasswordToken(data, () => setResend(!resend)));
        } else {
            toast.error('No email specified');
        }
    }


    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <div onClick={Completionist} style={{ color: "blue", cursor: 'pointer', display: 'inline-block', marginLeft: '5px' }}>Resend code? </div>
        } else {
            // Render a countdown
            return <span> {loading ? <Spinner color='text-suceess' status={loading} /> : `${minutes}:${seconds}`}</span>;
        }
    };


    const onSubmit = () => {
        dispatch(resetPasswordComplete(formState, () => history.push("/login")))
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6" >
                        <CCardGroup>
                            <CCard className="p-lg-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Reset password</h1>
                                        <div className="d-flex flex-row justify-content-between">
                                            <p className="text-muted">An xxxxxx digit code has been sent to {email ?? "your email"}, enter this code to reset your password</p>
                                        </div>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={(e) => handler('token', e.target.value)} type="number" placeholder="token" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={(e) => handler('new_password', e.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-2">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput onChange={(e) => handler('confirm_password', e.target.value)} type="password" placeholder="Confirm password" autoComplete="current-password" />
                                        </CInputGroup>
                                    </CForm>
                                    <span className='mb-4' style={{ float: 'right' }}><span style={{ paddingRight: '10px' }}>{`Resend code after time`}</span>
                                        <span style={{ float: 'right' }}><Countdown zeroPadTime={2} key={resend} date={Date.now() + 90000} renderer={renderer} /></span></span>

                                    <CButton disabled={loading} onClick={() => onSubmit()} color="primary" className="px-4"><Spinner color="text-light" status={loading} /> Reset password</CButton>

                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ForgotPassword