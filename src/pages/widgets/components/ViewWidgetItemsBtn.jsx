import { CButton } from "@coreui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { fetchWidgetItems, fetchWidgets, setCurrentWidget, uploadWidgetItems } from "src/redux/actions/WidgetActions";
import ItemsFormContainer from "./ItemsFormContainer";


const ViewWidgetItemsBtn = (props) => {
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const {items} = useSelector(state => state.widget.current_widget);
    const {current_link,params} = useSelector(state => state.widget);
    const dispatch = useDispatch();
    useEffect(() => {

    },[items])

    const onBtnClick = () => {
        dispatch(setCurrentWidget(props.widget));
        dispatch(fetchWidgetItems(
            {widget_id:props.widget.id},
            setLoading,
            () => setVisible(true)
        ))
    }
    const onUpdateWidgetItems = () => {
        dispatch(uploadWidgetItems(setLoading,() => {
            setVisible(false);
            dispatch(fetchWidgets(current_link,params))
        }));

    }

    return (
        <>
            <CButton onClick={onBtnClick} color="light"><Spinner status={loading} /> View&nbsp;Items</CButton>
            <AppModal title={props.widget.widget_title ?? "Widget Items"} size="xl" show={visible} onClose={() => setVisible(false)} >
                {
                    (items.id !== null && visible === true)? 
                       <>
                           <ItemsFormContainer />
                           <div>
                               <CButton onClick={onUpdateWidgetItems} color="primary"><Spinner status={loading} /> Publish Updates</CButton>
                           </div>
                       </>:<></>

                }
            </AppModal>
        </>
    )
}

export default ViewWidgetItemsBtn;