import { WIDGET_ACTION_TYPES } from "../action_types/WidgetActionTypes";

const initState = {
    current_widget:{
        id:null,
        widget_title:"",
        widget_link_text:"",
        widget_link_address:"",
        widget_type:"",
        is_block:"",
        items:[]
    },
    widgets:[],
    indexes:[],
    current_link:null,
    params:{state:"",with_indexes:1,with_items:0},
    links:[]
}
const WidgetReducer = (state = initState,action) => {
    switch(action.type){
        case WIDGET_ACTION_TYPES.setWidgets:{
            const {data,links,indexes} = action.payload;
            return {
                ...state,
                widgets:data,
                links,
                indexes
            }
        };
        case WIDGET_ACTION_TYPES.setCurrentWidget: {
            return {
                ...state,
                current_widget: {
                    ...state.current_widget,
                    ...action.payload
                }
            }
        };
        case WIDGET_ACTION_TYPES.setParams:{
            return {
                ...state,
                params:action.payload
            }
        };
        case WIDGET_ACTION_TYPES.setCurrentWidgetItems:{
            return {
                ...state,
                current_widget:{
                    ...state.current_widget,
                    items: action.payload
                }
            }
        }
        case WIDGET_ACTION_TYPES.setCurrentLink:{
            return {
                ...state,
                current_link:action.payload
            }
        }
        default:return state;
    }
}

export default WidgetReducer;