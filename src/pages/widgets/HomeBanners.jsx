import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import FileUploadComponent  from 'src/components/FileUploadComponent';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner,fetchHomeBanners } from "src/redux/actions/WidgetActions";
import BannerItem from "./components/BannerItem";
import { useEffect } from "react";
import Spinner from "src/components/Spinner";


const HomeBanners = (props) => {
    const dispatch = useDispatch();
    const {banners} = useSelector(state => state.widget);
    const loading = useSelector(state => state.app.loading);
    const onCreateBanner = (file,iloader = null) => {
        const formData = new FormData();
        formData.append('banner',file);
        dispatch(uploadBanner(formData,iloader, () => {
            dispatch(fetchHomeBanners(iloader));
        }))
    }
    useEffect(() => {
        dispatch(fetchHomeBanners());
    },[])
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4><Spinner status={loading} /> Home Page Banners</h4>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        {
                            banners.map((item,index) => (
                                <CCol sm={12} xl={3} lg={4}>
                                    <BannerItem item={item} index={index} key={item.id} items={banners} />
                                </CCol>
                            ))
                        }
                        <CCol sm={12} xl={3} lg={4}>
                            <FileUploadComponent caption="Upload Banner" file_path={null} onFileChanged={onCreateBanner} />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            
        </>
    )
}

export default HomeBanners;