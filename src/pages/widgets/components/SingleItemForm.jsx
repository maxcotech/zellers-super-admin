import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { generateEmptyWidgetItems } from "src/redux/actions/WidgetActions";
import WidgetItemForm from "./WidgetItemForm";



const SingleItemForm = (props) => {
    const {currentWidget} = props;
    const {items} = currentWidget;
    const dispatch = useDispatch();
    useEffect(() => {
        if(items.length === 0 || items.length > 1){
            dispatch(generateEmptyWidgetItems(1));
        }
    },[currentWidget.id]);

    if(items.length > 0){
        return (
            <>
                <WidgetItemForm index={0} item={items[0]} />
            </>
        )    
    } else {
        return <></>
    }
    
}

export default SingleItemForm;