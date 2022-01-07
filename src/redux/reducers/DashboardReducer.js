import { DASHBOARD_ACTION_TYPES } from "../action_types/DashboardActionTypes";

const initState = {
    total_users:0,
    total_stores:0,
    total_products:0,
    total_orders:0,
    orders:[],
    current_link:null,
    links:[],
    params:{}
}

const DashboardReducer = (state = initState,action) => {
    switch(action.type){
        case DASHBOARD_ACTION_TYPES.setOrders:{
            const {total_users,total_stores,total_products,total_orders,links,data} = action.payload;
            return {
                ...state,
                orders:data,
                total_users,
                total_stores,
                total_products,
                total_orders,
                links
            }
        };
        case DASHBOARD_ACTION_TYPES.setParams:{
            return {
                ...state,
                params:{
                    ...state.params,
                    ...action.payload
                }
            }
        };
        case DASHBOARD_ACTION_TYPES.setCurrentLink:{
            return {
                ...state,
                current_link:action.payload
            }
        }
        default:return state;
    }
}

export default DashboardReducer;