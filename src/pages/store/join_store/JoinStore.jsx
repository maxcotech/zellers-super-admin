import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormGroup, CLabel, CRow } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { joinStore, searchStores } from "src/redux/actions/StoreActions";
import StoreSearchList from "../components/StoreSearchList";

const JoinStore = (props) => {

    const inputRef = useRef();
    const loading = useSelector(state => state.app.loading);
    const [formState,setFormState] = useState({
        store_list:[],store_id:"",store_name:"",access_key:""
    });
    const dispatch = useDispatch();

    const setFormDataValue = (val,key) => {
        setFormState({
            ...formState,
            [key]:val
        })
    }

    const onFormSubmit = () => {
        let fdata = new FormData();
        fdata.append('store_id',formState.store_id);
        fdata.append('access_key',formState.access_key);
        dispatch(joinStore(fdata));
    }

    
    return (
        <>
            <CRow>
                <CCol lg={{size:8,offset:2}}>
                    <CCard>
                        <CCardHeader>
                            <h4>Join Store</h4>
                        </CCardHeader>
                        <CCardBody>
                            <form>
                                <CFormGroup>
                                    <CLabel>Select Store</CLabel>
                                    <input className="form-control" 
                                        ref={inputRef}
                                        onChange = {(e) => {
                                            e.preventDefault();
                                            if(e.target.value !== ""){
                                                dispatch(searchStores(e.target.value,(val) => (val.length > 0)? setFormDataValue(val,'store_list'):null))
                                            }
                                        }}
                                    />
                                    <StoreSearchList 
                                        list={formState.store_list} 
                                        onSelectItem = {(item) => {
                                            inputRef.current.value = item.store_name;
                                            console.log('selected store id is ',item.id)
                                            setFormState({
                                                ...formState,
                                                store_id:item.id,
                                                store_name:item.store_name,
                                                store_list:[]
                                            })
                                        }}
                                    />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel>Store Access Token</CLabel>
                                    <input 
                                      onChange={(e) => setFormDataValue(e.target.value,'access_key')}
                                      value={formState.access_key} placeholder="Enter Access Token" className="form-control" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CButton onClick={() => onFormSubmit()} block color="primary"><Spinner status={loading} /> Submit</CButton>
                                </CFormGroup>
                            </form>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default JoinStore;