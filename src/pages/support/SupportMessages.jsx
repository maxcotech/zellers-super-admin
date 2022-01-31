import { CAlert, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMessages, updateSeenStatus } from 'src/redux/actions/SupportActions';
import { useSelector } from 'react-redux';
import PaginationComponent from 'src/components/PaginationComponent';
import Spinner from 'src/components/Spinner';

const SupportMessages = () => {
    const { seen } = useParams();
    const dispatch = useDispatch();
    const { messages, links, params } = useSelector(state => state.support);
    const [currentMsgId, setCurrentMsgId] = useState(0);
    const loading = useSelector(state => state.app.loading);
    const onPaginationClick = (url) => dispatch(fetchMessages(url, params));
    const onSetCurrentMsgId = (id,status) => {
        if(status == 0){
            dispatch(updateSeenStatus({id,status:1}));
        }
       
        setCurrentMsgId((currentMsgId === id)? -1 :id);
    }

    useEffect(() => {
        dispatch(fetchMessages(null, { seen }))
        
    }, [seen]);

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4><Spinner status={loading} /> Support Messages</h4>
                </CCardHeader>
                <CCardBody>
                   
                        {
                            (messages.length > 0) ?
                                <CRow>
                                    <CCol sm={12} lg={{size:10,offset:1}}>
                                    <div className="accordion accordion-flush" id="accordionContainer">
                                        {
                                            messages.map((item, index) => (
                                                <div key={item.id} style={{ marginBottom: "10px" }} className="accordion-item">
                                                    <div style={{backgroundColor:"#335",color:"#fff",border:"1px solid silver",borderRadius:"4px",padding:"10px"}} className="accordion-header">
                                                        <CRow>
                                                            <CCol lg={1}><p style={{fontSize:"1.2em"}}>{index + 1} )</p></CCol>
                                                            <CCol lg={5}><p style={{fontSize:"1.2em"}}>{item.email_address}</p></CCol>
                                                            <CCol lg={3}><p style={{fontSize:"1.2em"}}>{`${item.created_at.date} (${item.created_at.time})`}</p></CCol>
                                                            <CCol lg={3}><CButton color="light" onClick={() => onSetCurrentMsgId(item.id,item.seen)} className="accordion-button">View Message</CButton></CCol>
                                                            
                                                        </CRow>
                                                    </div>
                                                    <div  className={`accordion-collapse collapse ${currentMsgId === item.id ? "show" : ""}`}>
                                                        <div style={{translate:"1s"}} className="accordion-body">
                                                            <CCard>
                                                                <CCardBody style={{fontSize:"1.1em"}}>
                                                                    {item.message}
                                                                </CCardBody>
                                                                <CCardFooter>
                                                                    <CButton href={"mailto:"+item.email_address} tag="a" color="dark">Reply</CButton>
                                                                </CCardFooter>
                                                            </CCard>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                    </CCol>
                                </CRow> :
                                <CAlert color="info">
                                    <h4>No Support Messages</h4>
                                    <p>No Support messages to display within the selected category.</p>
                                </CAlert>

                        }
                   
                </CCardBody>
                <CCardFooter>
                    <PaginationComponent links={links} onClick={onPaginationClick} />
                </CCardFooter>
            </CCard>
        </>
    )
}

export default SupportMessages;