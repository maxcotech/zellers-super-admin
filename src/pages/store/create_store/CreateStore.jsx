import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import Spinner from "src/components/Spinner";
import { createStoreAction } from "src/redux/actions/StoreActions";
import StoreForm from "../components/StoreForm";

const { CCard, CCardBody, CCardHeader, CRow, CCol } = require("@coreui/react")

const CreateStore = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const currentStore = useSelector(state => state.store.current_store);
    const store_list = useSelector(state => state.store.stores);
    const onCreateStore = (data) => {
        let formData = new FormData();
        Object.keys(data).map((key) => {
            formData.append(key,data[key])
        })
        dispatch(createStoreAction(formData));
    }
    useEffect(() => {
        if(currentStore !== null){
            toast.error("A store instance already exists.");
        }
    },[])
    if(store_list.length > 0){
        return <Redirect to={{pathname:"/store/select"}} />
    }
    return (
        <CCard>
            <CCardHeader>
                <h3><Spinner status={loading} /> Create Store</h3>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg={{size:8,offset:2}}>
                        <StoreForm submitHandler={onCreateStore} />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default CreateStore;