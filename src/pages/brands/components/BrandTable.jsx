import { CAlert, CButton, CButtonGroup} from "@coreui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ExpandableImage from "src/components/ExpandableImage";
import LoadingBtn from "src/components/LoadingBtn";
import { confirmAction } from "src/config/helpers/message_helpers";
import SelectResourceStatus from "src/pages/categories/components/SelectResourceStatus";
import { deleteBrand, fetchBrands, updateBrandStatus } from "src/redux/actions/BrandActions";
import BrandProductsBtn from "./BrandProductsBtn";
import UpdateBrandBtn from "./UpdateBrandBtn";


const BrandTable = (props) => {
    const { brands } = props;
    const {current_link,params} = useSelector(state => state.brand);
    const dispatch = useDispatch();
    const onItemStatusChanged = (data,iloader) => {
        dispatch(updateBrandStatus(data,iloader,() => {
            dispatch(fetchBrands(current_link,params))
        }))
    }
    const onItemDelete = async (data,iloader) => {
        if(await confirmAction({text:"This brand will be permanently deleted"})){
            dispatch(deleteBrand(data,iloader,() => {
                dispatch(fetchBrands(current_link,params))
            }))
        }
        
    }
    return (
        <>
            {
                (brands.length > 0) ?
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Brand&nbsp;Logo</th>
                                    <th>Brand&nbsp;Name</th>
                                    <th>Brand's&nbsp;Website</th>
                                    <th>Brand&nbsp;Status</th>
                                    <th>Actions</th>
                                    <th>Attributes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    brands.map((item,index) => (
                                        <tr key={'brands-'+item.id}>
                                            <td>{index + 1}</td>
                                            <td><ExpandableImage title={item.brand_name} src={item.brand_logo} /></td>
                                            <td>{item.brand_name ?? "N/A"}</td>
                                            <td><a href={item.website_url ?? "#"}>{item.website_url ?? "N/A"}</a></td>
                                            <td>
                                                <SelectResourceStatus changeHandler={onItemStatusChanged} id={item.id} value={item.status} />
                                            </td>
                                            <td>
                                                <CButtonGroup>
                                                    <UpdateBrandBtn defaultData={item} />
                                                    <LoadingBtn data={item.id} color="danger" onClick={onItemDelete}>Delete</LoadingBtn>
                                                </CButtonGroup>
                                            </td>
                                            <td>
                                                <BrandProductsBtn title={item.brand_name} brand={item.id}  />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>:
                    <CAlert>
                        <h4>No result</h4>
                        <p>Could not find any brand within the selected categories</p>
                    </CAlert>
        }

        </>
    )
}

export default BrandTable;