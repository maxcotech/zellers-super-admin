import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CAlert, CButton, CButtonGroup, CCol, CRow, CInputGroup, CInputGroupAppend } from "@coreui/react";
import ExpandableImage from "src/components/ExpandableImage";
import PaginationComponent from "src/components/PaginationComponent";
import { useDispatch } from "react-redux";
import { completeWithCategories, deleteCategoryItem, updateCategoryStatus, uploadCategoryItem } from "src/redux/actions/CategoryActions";
import Spinner from "src/components/Spinner";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import SubCategoryBtn from "./SubCategoryBtn";
import AppModal from "src/components/AppModal";
import CategoryForm from "./CategoryForm";
import UpdateCategoryBtn from "./UpdateCategoryBtn";
import SelectResourceStatus from "./SelectResourceStatus";
import LoadingBtn from "src/components/LoadingBtn";
import { confirmAction } from "src/config/helpers/message_helpers";
import CategoryProductsBtn from "./CategoryProductsBtn";

const CategoryTable = (props) => {
    const { title, parent, status } = props;
    const [currentLink, setCurrentLink] = useState(null);
    const [categories, setCategories] = useState([]);
    const [links, setLinks] = useState([]);
    const [showForm,setShowForm] = useState(false);
    const [params, setParams] = useState({
        verbose: 4,
        parent: parent ?? null,
        title: title ?? null,
        status: status ?? resourceStatus.active

    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const onCompleteFetchCategories = (data, currentLink) => {
        setCategories(data.data);
        setLinks(data.links);
        setCurrentLink(currentLink);
        if(showForm){
            setShowForm(false);
        }
    }

    useEffect(() => {
        setParams({
            verbose: 4,
            parent: parent ?? null,
            title: title ?? null,
            status: status ?? resourceStatus.active
        });
        if (!props.defaultData) {
            dispatch(completeWithCategories(currentLink, params, (val) => setLoading(val), onCompleteFetchCategories))
        } else {

            onCompleteFetchCategories(props.defaultData.data, props.defaultData.current_link)
        }

    }, [parent, title, dispatch])
    const onStatusChange = (e) => {
        setParams({ ...params, status: e.target.value });
        dispatch(completeWithCategories(currentLink, { ...params, status: e.target.value }, (val) => setLoading(val), onCompleteFetchCategories))
    }
    const onFetchCategories = () => {

        dispatch(completeWithCategories(currentLink,params,(val) => setLoading(val),onCompleteFetchCategories))
    }
    const onCreateCategory = (data) => {
        dispatch(uploadCategoryItem(data,(val) => setLoading(val),onFetchCategories))
    }

    const onUpdateCategory = (data,iloader) => {
        dispatch(uploadCategoryItem(data,iloader,onFetchCategories))
    }

    const onItemStatusChange = (data,iloader) => {
        dispatch(updateCategoryStatus(data,iloader,onFetchCategories));
    }

    const onDeleteCategoryItem = async (data,iloader,onComplete) => {
        if(await confirmAction({text:'This operation may irreversibly delete the selected category and its attributes.'})){
            dispatch(deleteCategoryItem(data,iloader,onComplete));
        }
    }

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> {title ?? "Categories"}</h4>
                    <div className="card-header-actions" >
                        <CInputGroup>
                           
                                <select onChange={onStatusChange} value={params.status} className="form-control inline-block">
                                    <option value={resourceStatus.active}>Active Categories</option>
                                    <option value={resourceStatus.inactive}>Inactive Categories</option>
                                    <option value={resourceStatus.in_draft}>Categories in draft</option>
                                    <option value={resourceStatus.in_review}>Categories in review</option>
                                    <option value={resourceStatus.blacklisted}>Blacklisted Categories</option>
                                </select>
                           
                            <CInputGroupAppend>
                                <CButton onClick={() => setShowForm(true)} color="dark" >+ Add Category</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>

                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (categories.length > 0) ? (
                            <div>
                                <div className="table-responsive">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Category&nbsp;Icon</th>
                                                <th>Category&nbsp;Name</th>
                                                <th>Display&nbsp;Title</th>
                                                <th>Category&nbsp;Slug</th>
                                                <th>Category&nbsp;Status</th>
                                                <th>Attributes</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                categories.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td><ExpandableImage src={item.category_icon} /></td>
                                                        <td>{item.category_title}</td>
                                                        <td>{item.display_title}</td>
                                                        <td>{item.category_slug}</td>
                                                        <td><SelectResourceStatus changeHandler={onItemStatusChange} value={item.status} id={item.id} /></td>
                                                        <td>
                                                            <CButtonGroup>
                                                                <SubCategoryBtn status={status} parent={item.id} title={item.category_title} />
                                                                <CategoryProductsBtn title={item.category_title} slug={item.category_slug} />
                                                            </CButtonGroup>
                                                        </td>
                                                        <td>
                                                            <CButtonGroup>
                                                                <LoadingBtn onComplete={onFetchCategories} data={item.id} color="danger" onClick={onDeleteCategoryItem} >Delete</LoadingBtn>
                                                                <UpdateCategoryBtn onRefresh={onFetchCategories} submitHandler={onUpdateCategory} data={item} />
                                                            </CButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <PaginationComponent links={links} onClick={(path) => {
                                        setCurrentLink(path);
                                        dispatch(completeWithCategories(path,params,(val) => setLoading(val),onCompleteFetchCategories));
                                    }} />
                                </div>
                            </div>
                        ) :
                            (<CAlert color="info">
                                <h4>None Found</h4>
                                <p>Could not find any category that belongs to this status or level</p>
                                <div><CButton color="primary">Create Category</CButton></div>

                            </CAlert>)
                    }
                </CCardBody>
            </CCard>
            <AppModal size="lg" show={showForm} title="Add Category" onClose={() => setShowForm(false)}>
                <CategoryForm loading={loading} editMode={false} parent_id={props.parent} submitHandler={onCreateCategory} />
            </AppModal>
        </>
    )
}

CategoryTable.propTypes = {
    status: PropTypes.number,
    title: PropTypes.string,
    parent: PropTypes.number,
    level: PropTypes.number,
    defaultData: PropTypes.object
}

export default CategoryTable;