import { CAlert } from "@coreui/react";
import { useSelector } from "react-redux";
import { WidgetTypes } from "src/config/app_config/widget_config";
import FourItemsForm from "./FourItemsForm";
import MultiItemsForm from "./MultiItemsForm";
import SingleItemForm from "./SingleItemForm";


const ItemsFormContainer = () => {
    const currentWidget = useSelector(state => state.widget.current_widget);
    const currentType = currentWidget.widget_type;

    const getComponent = () => {
        switch(parseInt(currentType)){
            case WidgetTypes.singleItemWidget: return <SingleItemForm currentWidget={currentWidget} />;
            case WidgetTypes.fourItemWidget: return <FourItemsForm currentWidget={currentWidget} />;
            case WidgetTypes.multiItemWidget: return <MultiItemsForm currentWidget={currentWidget}  />;
            default: return <CAlert color="danger">Currently selected widget type is not supported.</CAlert>;
        }
    }
    return (
        <>
            {
                (currentWidget.id != null)?
                <>
                        {
                            getComponent()
                        }
                </>  :
                <></>
            }
        </>
    )
}

export default ItemsFormContainer;