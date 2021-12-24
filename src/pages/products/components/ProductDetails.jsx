import { CAlert, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ExpandableImage from "src/components/ExpandableImage";
import HtmlEntity from "src/components/HtmlEntity";
import LoadingBtn from "src/components/LoadingBtn";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";
import SelectResourceStatus from "src/pages/categories/components/SelectResourceStatus";
import { deleteProduct, fetchProductDetails, updateProductStatus } from "src/redux/actions/ProductActions";


const ProductDetails = (props) => {
    const {loading,onClose} = props;
    const dispatch = useDispatch()
    const [shouldClose,setShouldClose] = useState(false);
    const [shouldRefresh,setShouldRefresh] = props.shouldRefreshState;
    const {product_details} = useSelector(state => state.product);
    const {currency_sym} = useSelector(state => state.auth.currency);
    const {product_status,id,product_image,images,simple_description,description,key_features} = product_details;
    const onStatusChanged = (data,iloader) => {
        dispatch(updateProductStatus(
            data,iloader,
            () => dispatch(fetchProductDetails(id,iloader)))
        )
        if(data.status != product_status){
            setShouldRefresh(true);
        }
    }
    const onDeleteProduct = async (data,iloader) => {
        if(await confirmAction({text:"This Product will be permanently deleted."})){
            dispatch(deleteProduct(data,iloader, async () => {
                setShouldRefresh(true);
                setShouldClose(true);
            }))
        }
        
    }
    useEffect(() => {
        if(shouldClose){
            onClose();
        }
    },[shouldRefresh,shouldClose])

    if(product_details === null || typeof product_details?.id === "undefined"){
        return <Spinner status={loading} />
    } else {
        return (
            <>
                <CCard>
                    <CCardHeader>
                        <h4 className="inline-block"><Spinner status={loading}/> {product_details.product_name}</h4>
                        <div className="card-header-actions">
                            <CInputGroup>
                                <CInputGroupPrepend>
                                    <LoadingBtn data={id} onClick={onDeleteProduct} color="danger">Delete</LoadingBtn>
                                </CInputGroupPrepend>
                                <SelectResourceStatus id={id} changeHandler={onStatusChanged} className="form-control" value={product_status} />

                            </CInputGroup>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol lg={3}>
                                <CCard>
                                    <CCardBody>
                                        <ExpandableImage title="Product Image" width="100%" src={product_image} />
                                    </CCardBody>
                                    <CCardFooter>
                                        <p className="text-center">Product Image</p>
                                    </CCardFooter>
                                </CCard>
                            </CCol>
                            <CCol lg={9}>
                                <CCard>
                                    <CCardHeader>
                                        <h5>Product Gallery</h5>
                                    </CCardHeader>
                                    {
                                        (images.length > 0)?
                                        <CCardBody>
                                            <CRow>
                                        {
                                            images.map((item) => (
                                                <CCol lg={4} key={"images-"+item.id}>
                                                    <CCard>
                                                    <CCardBody>
                                                        <ExpandableImage title={normalizeSnakeCasing(item.image_type)} src={item.image_url} width="100%" />
                                                    </CCardBody>
                                                    <CCardFooter>
                                                        <p className="text-center">
                                                            {normalizeSnakeCasing(item.image_type)}
                                                        </p>
                                                    </CCardFooter>
                                                    </CCard>
                                                </CCol>
                                            ))
                                        }
                                        </CRow>
                                    </CCardBody>:
                                    <CAlert color="info">
                                        <p>This Product does not have any gallery image</p>
                                    </CAlert>
                                    }
                                   
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol lg={6}>
                                <CCard>
                                    <CCardHeader><h5>Short Description</h5></CCardHeader>
                                    <CCardBody>
                                        <HtmlEntity>{simple_description}</HtmlEntity>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={6}>
                                <CCard>
                                    <CCardHeader><h5>Key Features</h5></CCardHeader>
                                    <CCardBody>
                                        <HtmlEntity>{key_features}</HtmlEntity>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol lg={12}>
                                <CCard>
                                    <CCardHeader><h5>Description</h5></CCardHeader>
                                    <CCardBody>
                                        <HtmlEntity>{description}</HtmlEntity>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                        </CRow>
                        <CRow>
                            <CCol lg={4}>
                                <CCard>
                                    <CCardHeader><h5>Stock Details</h5></CCardHeader>
                                    <CCardBody>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        Available Stock
                                                    </th>
                                                    <td>
                                                        {product_details.amount_in_stock+" pcs"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Regular Price
                                                    </th>
                                                    <td>
                                                        <HtmlEntity>{currency_sym+product_details.regular_price}</HtmlEntity>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Sales Price
                                                    </th>
                                                    <td>
                                                        <HtmlEntity>{currency_sym+product_details.sales_price}</HtmlEntity>
                                                    </td>
                                                </tr>
                                        
                                            </tbody>
                                        </table>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={4}>
                                <CCard>
                                    <CCardHeader><h5>Dimensions</h5></CCardHeader>
                                    <CCardBody>
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        Weight (Kg)
                                                    </th>
                                                    <td>
                                                        {product_details.weight ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Height (cm)
                                                    </th>
                                                    <td>
                                                        {product_details.dimension_height ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Width (cm)
                                                    </th>
                                                    <td>
                                                        {product_details.dimension_width ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Length (Kg)
                                                    </th>
                                                    <td>
                                                        {product_details.dimension_length ?? "N/A"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={4}>
                                <CCard>
                                    <CCardHeader><h5>Classification</h5></CCardHeader>
                                    <CCardBody>
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        Brand
                                                    </th>
                                                    <td>
                                                        {product_details.brand?.brand_name ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Category
                                                    </th>
                                                    <td>
                                                        {product_details.category?.category_title ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Product Sku
                                                    </th>
                                                    <td>
                                                        {product_details.product_sku ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Seller
                                                    </th>
                                                    <td>
                                                        {product_details.store?.store_name ?? "N/A"}
                                                    </td>
                                                </tr>
                                               
                                            </tbody>
                                        </table>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        {
                            (product_details.variations?.length > 0)?
                                <CRow>
                                    <CCol lg={12}>
                                        <CCard>
                                            <CCardHeader><h5>Variations</h5></CCardHeader>
                                            <CCardBody>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>Variation Image</th>
                                                            <th>Variation Name</th>
                                                            <th>Variation Sku</th>
                                                            <th>Regular Price</th>
                                                            <th>Sales Price</th>
                                                            <th>Amount In Stock</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       {
                                                           product_details.variations.map((item,index) => (
                                                               <tr key={"variations-"+item.id}>
                                                                   <td>{index + 1}</td>
                                                                   <td><ExpandableImage title={item.variation_name} src={item.variation_image} /></td>
                                                                   <td>{item.variation_name ?? "N/A"}</td>
                                                                   <td>{item.variation_sku ?? "N/A"}</td>
                                                                   <td><HtmlEntity>{(item.regular_price) ? currency_sym+item.regular_price:"N/A"}</HtmlEntity></td>
                                                                   <td><HtmlEntity>{(item.sales_price) ? currency_sym+item.sales_price:"N/A"}</HtmlEntity></td>
                                                                   <td>{item.amount_in_stock ?? "N/A"}</td>
                                                               </tr>
                                                           ))
                                                       }
                                                    </tbody>
                                                </table>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                </CRow>
                                :<></>
                        }
                    </CCardBody>
                </CCard>
            </>
        )    
    }
}

export default ProductDetails;