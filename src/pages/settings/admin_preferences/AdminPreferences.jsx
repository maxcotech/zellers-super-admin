import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "src/components/Spinner";
import { completeWithPreferences, updatePreferences } from "src/redux/actions/SettingsActions";
import PreferenceInput from "./components/PreferenceInput";

const AdminPreferences = () => {
    const [preferences,setPreferences] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const setValue = (value,key) => {
        const newPreferences = preferences.map((pref) => {
            if(pref.preference_key === key){
                return {
                    ...pref,
                    preference_value:value
                }
            }
            return pref;
        })
        setPreferences(newPreferences);
    }

    useEffect(() => {
        dispatch(completeWithPreferences(setLoading,(data) => {
            console.log(data);
            setPreferences(data)
        }))
    },[]);
    const onSubmit = () => {
        const payload = {
            data:JSON.stringify(preferences)
        }
        dispatch(updatePreferences(payload,setLoading))
    }
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h5><Spinner status={loading} /> Edit Preferences</h5>
                </CCardHeader>
                <CCardBody>
                    {
                        preferences.map((item,index) => (
                            <PreferenceInput key={item.preference_key+"_"+index}  changeHandler={setValue} item={item} />
                        ))
                    }
                    <CButton onClick={onSubmit} disabled={loading} color="primary"><Spinner status={loading}/> Apply Changes</CButton>
                </CCardBody>
            </CCard>
        </>
    )
}

export default AdminPreferences;