import { CButton, CCard, CCardBody, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "src/components/Spinner";


const WalletFiltersForm = (props) => {
    const loading = useSelector(state => state.app.loading);
    const [formState,setFormState] = useState({
        start_date:"",
        end_date:"",
        in_range:0
    })

    const setFormStateValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }

    const onSetInRange = (e) => {
        let inRange = 0;
        if(e.target.checked){
            inRange = 1;
        }
        setFormStateValue(inRange,'in_range')
    }

    const onSubmit = () => {
        props.submitHandler(formState);
    }
    return (
        <CCard>
            <CCardBody>
                <form>
                    <CFormGroup>
                        <CLabel>Initial Date:</CLabel>
                        <input onChange={(e) => setFormStateValue(e.target.value,'start_date')} type="date" value={formState.start_date} placeholder="Enter Initial Date" className="form-control" />
                        <small className="form-text text-muted">
                            This will enable you to filter transactions from a specific date.
                        </small>
                    </CFormGroup>
                    {
                        (formState.in_range == 1)?
                        <CFormGroup>
                            <CLabel>End Date:</CLabel>
                            <input value={formState.end_date} onChange={(e) => setFormStateValue(e.target.value,'end_date')} type="date" placeholder="Enter End Date" className="form-control" />
                            <small className="form-text text-muted">
                                This will enable you to limit transactions to a specific date range.
                            </small>
                        </CFormGroup>:<></>
                    }
                    <CFormGroup>
                        <input onChange={onSetInRange} type="checkbox" checked={formState.in_range == 1} /> I wish to add a range.
                    </CFormGroup>
                    <CButton onClick={onSubmit} color="primary"><Spinner status={loading} /> Submit</CButton>
                </form>
            </CCardBody>
        </CCard>
    )
}

export default WalletFiltersForm;