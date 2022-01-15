import { CCol, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateEmptyWidgetItems } from "src/redux/actions/WidgetActions";
import WidgetItemForm from "./WidgetItemForm";


const FourItemsForm = (props) => {
    const {currentWidget} = props;
    const {items} = currentWidget;
    const dispatch = useDispatch();

    useEffect(() => {
        if(items.length != 4){
            dispatch(generateEmptyWidgetItems(4));
        }
    },[currentWidget.id])

    if(items.length > 0){
        return (
            <>
                <CRow>
                    <CCol lg={6}>
                       1) <WidgetItemForm index={0} item={items[0]} />
                    </CCol>
                    <CCol lg={6}>
                       2) <WidgetItemForm index={1} item={items[1]} />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg={6}>
                       3) <WidgetItemForm index={2} item={items[2]} />
                    </CCol>
                    <CCol lg={6}>
                       4) <WidgetItemForm index={3} item={items[3]} />
                    </CCol>
                </CRow>
            </>
        )    
    } else {
        return <></>
    }
    
}

export default FourItemsForm;