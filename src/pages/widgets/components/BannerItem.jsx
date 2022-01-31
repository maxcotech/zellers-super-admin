import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter } from "@coreui/react";
import FileUploadComponent from "src/components/FileUploadComponent";
import LoadingBtn from "src/components/LoadingBtn";
import { useDispatch } from 'react-redux';
import { deleteHomeBanner, fetchHomeBanners, setBanners, uploadBanner, uploadBannerText } from "src/redux/actions/WidgetActions";
import BannerTextFormBtn from "./BannerTextFormBtn";
import { confirmAction } from "src/config/helpers/message_helpers";

const BannerItem = (props) => {
    const {item,index,items} = props;
    const dispatch = useDispatch();

    const onUpdateBanner = (file,iloader = null) => {
        const formData = new FormData();
        formData.append('banner',file);
        formData.append('id',item.id);
        dispatch(uploadBanner(formData,iloader,(data) => {
            let oldItems = items;
            oldItems[index].banner = data.banner;
            dispatch(setBanners(oldItems));
        }))
    }

    const onUpdateBannerText = (data,iloader = null, onComplete = null) => {
        dispatch(uploadBannerText(data,iloader,() => {
            dispatch(fetchHomeBanners(iloader,onComplete))
        }))
    }
    const onDeleteBanner = async (data, iloader = null) => {
        if(await confirmAction({text:"This Banner item will be permanently deleted "})){
            dispatch(deleteHomeBanner(data,iloader,() => {
                dispatch(fetchHomeBanners(iloader));
            }))
        }
    }
    return (
        <>
            <CCard>
                <CCardBody>
                    <FileUploadComponent caption={<a href={item.banner_link ?? "#"}>{item.banner_link ?? "No Link Text"}</a>}  onFileChanged={onUpdateBanner} file_path={item.banner} />
                </CCardBody>
                <CCardFooter>
                    <CButtonGroup>
                        <LoadingBtn onClick={onDeleteBanner} data={item.id} color="danger">Delete</LoadingBtn>
                        <BannerTextFormBtn submitHandler={onUpdateBannerText} item={item} />
                    </CButtonGroup>
                </CCardFooter>
            </CCard>
        </>
    )
}

export default BannerItem;