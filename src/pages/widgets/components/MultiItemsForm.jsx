import { CButton, CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { minMultiWidgetCount } from "src/config/app_config/widget_config";
import { generateEmptyWidgetItems, incrementItemsLength } from "src/redux/actions/WidgetActions";
import WidgetItemForm from "./WidgetItemForm";



const MultiItemsForm = (props) => {
    const {currentWidget} = props;
    const {items} = currentWidget;
    const dispatch = useDispatch();
    const onIncrementItems = () => {
        dispatch(incrementItemsLength());
    }
    useEffect(() => {
        if(items.length < minMultiWidgetCount){
            dispatch(generateEmptyWidgetItems(minMultiWidgetCount));
        }
    },[currentWidget.id]);

    if(items.length > 0){
        return (
            <>
               
                <CRow>
                    {
                        items.map((item,index) => (
                            <CCol lg={6}>
                              {index + 1})  <WidgetItemForm index={index} item={item} />
                            </CCol>
                        ))
                    }
                   
                </CRow>
                <CRow>
                    <CCol>
                    <div className="text-right">
                    <CButton onClick={onIncrementItems} color="dark">+&nbsp;Add&nbsp;Item</CButton>
                    </div>
               
                    </CCol>
                </CRow>
            </>
        )    
    } else {
        return <></>
    }
    
}

export default MultiItemsForm;