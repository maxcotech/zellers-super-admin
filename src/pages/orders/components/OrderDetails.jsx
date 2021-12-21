import { CAlert, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useSelector } from "react-redux";
import ExpandableImage from "src/components/ExpandableImage";
import HtmlEntity from "src/components/HtmlEntity";
import CustomerDetailsCard from "./CustomerDetailsCard";
import SelectOrderStatus from "./SelectOrderStatus";
import ShippingAddressCard from "./ShippingAddressCard";


const OrderDetails = (props) => {
    const { order, items } = props;
    const {currency_sym} = useSelector(state => state.auth.currency);
    const getAppropriateProductImage = (item) => {
        const variation = item.variation;
        const product = item.product;
        if(item.product_type == "variation_product" && variation?.variation_image != null){
            return variation?.variation_image ?? product.product_image
        } else {
            return product.product_image;
        }
    }
    const getAppropriateProductSku = (item) => {
        const variation = item.variation;
        const product = item.product;
        if(item.product_type == "variation_product" && variation?.variation_sku != null){
            return variation?.variation_sku ?? product.product_sku
        } else {
            return product.product_sku;
        }
    }

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h5 className="inline-block">Order No: {order.order.order_number}</h5>
                    <div className="card-header-actions">
                        <SelectOrderStatus className="form-control capitalize" id={order.id} value={order.status} />
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol>
                            <ShippingAddressCard billing_address={order.order.billing_address} />
                        </CCol>
                        <CCol>
                            <CustomerDetailsCard user={order.user} billing_address={order.order.billing_address} />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    Order Items
                                </CCardHeader>
                                <CCardBody>
                                    {
                                        (items.length > 0) ?
                                            <div className="table-responsive">
                                                <table className="table table-condensed">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>Product Image</th>
                                                            <th>Product Name</th>
                                                            <th>Product Sku</th>
                                                            <th>Total Amount</th>
                                                            <th>Quantity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       {
                                                           items.map((item,index) => (
                                                               <tr key={'order_items_'+item}>
                                                                   <td>{index + 1}</td>
                                                                   <td><ExpandableImage title={item.product.product_name} src={getAppropriateProductImage(item)} /></td>
                                                                   <td>
                                                                       <div>{item.product.product_name}</div>
                                                                       {
                                                                           (item.variation != null)?
                                                                            <div>{item.variation.variation_name}</div>:
                                                                            <></>
                                                                       }
                                                                    </td>
                                                                    <td>{getAppropriateProductSku(item)}</td>
                                                                    <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.paid_amount}</td>
                                                                    <td>{item.quantity}</td>
                                                               </tr>
                                                           ))
                                                       }
                                                    </tbody>
                                                </table>

                                            </div>:
                                            <CAlert color="danger">
                                                <h4>Weird !!!</h4>
                                                <p>For some unknown reasons, there are no products under this store order.</p>
                                            </CAlert>
                                    }

                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </>
    )
}

export default OrderDetails;