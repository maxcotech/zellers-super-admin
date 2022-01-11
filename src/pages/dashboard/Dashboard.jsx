import CIcon from "@coreui/icons-react";
import { CAlert, CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetProgressIcon } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import HtmlEntity from "src/components/HtmlEntity";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { orderStatuses } from "src/config/app_config/order_config";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";
import { defaultDashboardUrl, fetchDashboardData } from "src/redux/actions/DashboardActions";
import OrderTable from "./components/OrderTable";


const Dashboard = (props) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const {total_users,total_stores,total_products,total_orders,orders,params,links} = useSelector(state => state.dashboard);
    const onPaginationClick = (url) => {
        dispatch(fetchDashboardData(url,params));
    }
    const onChangeStatus = (e) => {
        dispatch(fetchDashboardData(defaultDashboardUrl,{...params,status:e.target.value}))
    }
    useEffect(() => {
        dispatch(fetchDashboardData(defaultDashboardUrl,params))
    },[])
    return ( 
        <div>
            <CRow>
                <CCol lg={3} sm={12}>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{total_users} Users</HtmlEntity>}
                        text="Total Users"
                        color="gradient-primary"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol lg={3} sm={12}>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{total_stores} Stores</HtmlEntity>}
                        text="Total Stores"
                        color="gradient-warning"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                
                <CCol lg={3} sm={12}>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{total_products} Products</HtmlEntity>}
                        text="Total Products"
                        color="gradient-success"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol lg={3} sm={12}>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{total_orders} Orders</HtmlEntity>}
                        text="Total Orders"
                        color="gradient-danger"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>


            </CRow>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading}/> Recent Orders</h4>
                    <div className="card-header-actions">
                        <select onChange={onChangeStatus} value={params.status ?? ""} className="form-control">
                            <option value="">Select Order Status</option>
                            {
                                Object.keys(orderStatuses).map((key) => (
                                    <option key={key} value={orderStatuses[key]}>{normalizeSnakeCasing(key)}</option>
                                ))
                            }
                        </select>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (orders.length > 0)?
                            <OrderTable orders={orders}/>:
                            <CAlert color="info">
                                <h4>No Orders Yet</h4>
                                <p>Users are yet to place orders.</p>
                            </CAlert>
                    }
                    <div>
                        <PaginationComponent onClick={onPaginationClick} links={links} />
                    </div>
                </CCardBody>
            </CCard>
            
        </div>
    )
}

export default Dashboard;