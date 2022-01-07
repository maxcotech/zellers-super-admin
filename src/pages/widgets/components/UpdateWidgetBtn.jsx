import { CButton } from "@coreui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import { fetchWidgets, setCurrentWidget, uploadWidget } from "src/redux/actions/WidgetActions";
import WidgetForm from "./WidgetForm";


const UpdateWidgetBtn = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const {current_link,params} = useSelector(state => state.widget);
    const onClickBtn = () => {
        dispatch(setCurrentWidget(props.widget));
        console.log('selecting widget ',props.widget);
        setVisible(true);
    }
    const updateWidget = (data,iloader = null) => {
        dispatch(uploadWidget(data,iloader,() => {
            console.log('updated widget with ',data)
            setVisible(false);
            dispatch(fetchWidgets(current_link,params));
        }))
    }
    return (
        <>
            <CButton onClick={onClickBtn} color="primary">Update</CButton>
            <AppModal title="Update Widget" show={visible} onClose={() => setVisible(false)}>
                <WidgetForm submitHandler={updateWidget} defaultData={props.widget} />
            </AppModal>
        </>
    )
}

export default UpdateWidgetBtn;