import { CAlert, CButtonGroup } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import ExpandableImage from "src/components/ExpandableImage";
import HtmlEntity from "src/components/HtmlEntity";
import LoadingBtn from "src/components/LoadingBtn";
import { confirmAction } from "src/config/helpers/message_helpers";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";
import SelectResourceStatus from "src/components/SelectResourceStatus";
import { deleteProduct, fetchProducts, updateProductStatus } from "src/redux/actions/ProductActions";
import ProductDetailsBtn from "./ProductDetailsBtn";


const ProductTable = (props) => {
    const dispatch = useDispatch();
    const {currency_sym} = useSelector(state => state.auth.currency);
    const {current_link,params} = useSelector(state => state.product);
    const {products} = props;
    const onChangeProductStatus = (data,iloader = null) => {
        dispatch(updateProductStatus(data,iloader,onRefresh))
    }

    const onRefresh = () => {
        dispatch(fetchProducts(current_link,params));
    }
    
    const onDeleteProduct = async (data,iloader = null,onComplete = null) => {
        if(await confirmAction({text:"This Product will be permanently deleted."})){
            dispatch(deleteProduct(data,iloader,onComplete));
        }
    }
    return (
        <>
            {
                (products.length > 0)?
                <>
                    <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Product&nbsp;Image</th>
                            <th>Product&nbsp;Name</th>
                            <th>Product&nbsp;Slug</th>
                            <th>Stock</th>
                            <th>Regular&nbsp;Price</th>
                            <th>Sales&nbsp;Price</th>
                            <th>Product&nbsp;Type</th>
                            <th>Product&nbsp;Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td><ExpandableImage src={item.product_image} width={"80px"} /></td>
                                    <td>{item.product_name ?? "N/A"}</td>
                                    <td>{item.product_slug ?? "N/A"}</td>
                                    <td>{item.amount_in_stock ?? "N/A"}</td>
                                    <td><HtmlEntity>{(item.regular_price) ? currency_sym + item.regular_price : "N/A"}</HtmlEntity></td>
                                    <td><HtmlEntity>{(item.sales_price) ? currency_sym + item.sales_price : "N/A"}</HtmlEntity></td>
                                    <td>{normalizeSnakeCasing(item.product_type ?? "N/A")}</td>
                                    <td><SelectResourceStatus changeHandler={onChangeProductStatus} id={item.id} value={item.product_status} /></td>
                                    <td>
                                        <CButtonGroup>
                                            <ProductDetailsBtn onRefresh={onRefresh} slug={item.product_slug} id={item.id} />
                                            <LoadingBtn onComplete={() => dispatch(fetchProducts(current_link, params))} onClick={onDeleteProduct} data={item.id} color="danger">Delete</LoadingBtn>
                                        </CButtonGroup>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
                </>:
                <CAlert color="info">
                    <h4>No Products</h4>
                    <p>Sorry, could not find any product to render.</p>
                </CAlert>
            }
            
        </>
    )
}

export default ProductTable;