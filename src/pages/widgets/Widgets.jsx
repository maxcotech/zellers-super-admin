import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { confirmAction } from "src/config/helpers/message_helpers";
import { defaultWidgetsUrl, deleteWidget, fetchWidgets, swapWidgetIndex, updateWidgetStatus } from "src/redux/actions/WidgetActions";
import SelectResourceStatus from "../../components/SelectResourceStatus";
import SwapIndexSelect from "./components/SwapIndexSelect";
import UpdateWidgetBtn from "./components/UpdateWidgetBtn";
import ViewWidgetItemsBtn from "./components/ViewWidgetItemsBtn";


const Widgets = () => {
    const {status} = useParams();
    const loading = useSelector(state => state.app.loading);
    const {widgets,links,params,indexes,current_link} = useSelector(state => state.widget);
    const dispatch = useDispatch();
    const onPaginateClick = (url) => {
        dispatch(fetchWidgets(url,params));
    }
    const onSwapIndex = (data,iloader) => {
        dispatch(swapWidgetIndex(data,iloader,() => {
            dispatch(fetchWidgets(current_link,params))
        }))
    }
    const onChangeStatus = (data,iloader = null) => {
        dispatch(updateWidgetStatus(data,iloader,() => {
            dispatch(fetchWidgets(current_link,params))
        }))
    }
    const onDeleteWidget =async (data,iloader) => {
        if(await confirmAction({text:"This widget and all its attributes will be deleted."})){
            dispatch(deleteWidget(data,iloader,() => {
                dispatch(fetchWidgets(current_link,params));
            }))
        }
    }
    
    useEffect(() => {
        dispatch(fetchWidgets(defaultWidgetsUrl,{...params,status}));
    },[status])
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4><Spinner status={loading} /> Widgets</h4>
                </CCardHeader>
                <CCardBody>
                    <div>
                        {
                            (widgets.length > 0)? 
                              <div className="table-responsive">
                                  <table className="table table-striped">
                                      <thead>
                                          <tr>
                                              <th>S/N</th>
                                              <th>Widget&nbsp;Title</th>
                                              <th>Widget&nbsp;Link&nbsp;Text</th>
                                              <th>Widget&nbsp;Link&nbsp;Address</th>
                                              <th>Widget&nbsp;Type</th>
                                              <th>Index&nbsp;No</th>
                                              <th>Status</th>
                                              <th>Element&nbsp;Type</th>
                                              <th>Actions</th>
                                              <th>Items</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {
                                              widgets.map((item,index) => (
                                                  <tr id={"widget_"+item.id}>
                                                      <td>{index + 1}</td>
                                                      <td>{item.widget_title ?? "N/A"}</td>
                                                      <td>{item.widget_link_text ?? "N/A"}</td>
                                                      <td><a href={item.widget_link_address ?? "#"}>{item.widget_link_address ?? "Not Available"}</a></td>
                                                      <td>{item.widget_type_text}</td>
                                                      <td><SwapIndexSelect swapHandler={onSwapIndex}  id={item.id} indexes={indexes} value={item.index_no} />  </td>
                                                      <td><SelectResourceStatus id={item.id} changeHandler={onChangeStatus}  value={item.status} /></td>
                                                      <td>{item.is_block_text}</td>
                                                      <td>
                                                          <CButtonGroup>
                                                              <UpdateWidgetBtn  widget={item} />
                                                              <LoadingBtn data={item.id} onClick={onDeleteWidget} color="danger">Delete</LoadingBtn>
                                                          </CButtonGroup>
                                                      </td>
                                                      <td>
                                                          <ViewWidgetItemsBtn widget={item} />
                                                      </td>
                                                  </tr>
                                              ))
                                          }
                                      </tbody>
                                  </table>
                              </div>:
                              <CAlert color="info">
                                  <h4>No Widgets Found</h4>
                                  <p>Could not find any widgets within the selected constraints.</p>
                              </CAlert>
                        }
                    </div>
                    <div>
                        <PaginationComponent links={links} onClick={onPaginateClick} />
                    </div>
                </CCardBody>
            </CCard>
           
        </>
    )
}

export default Widgets;