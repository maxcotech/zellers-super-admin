import { CButton } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import Spinner from "src/components/Spinner";
import { BASE_URL } from "src/config/constants/app_constants";
import { completeWithCategories } from "src/redux/actions/CategoryActions";
import CategoryTable from "./CategoryTable";


const SubCategoryBtn = (props) => {
    const {status,parent} = props;
    const [visible,setVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [defaultData,setDefaultData] = useState({
        data:null,
        current_link:null
    })
    const onCompleteFetch = (data,current_link) => {
        setDefaultData({
            data,current_link
        });
        setVisible(true);
    }
    const onBtnClick = () => {
        dispatch(completeWithCategories(
            `${BASE_URL}categories`,
            {status,parent,verbose:4},
            (val) => setLoading(val),
            (data,link) => onCompleteFetch(data,link)
        )
        )
    }

    return (
        <>
            <CButton onClick={onBtnClick} color="primary"><Spinner status={loading} /> Sub&nbsp;categories</CButton>
            <AppModal show={visible} onClose={() => setVisible(false)} size="xl" closeOnBackdrop={false} >
                {
                    (defaultData.data != null) ? <CategoryTable {...props} defaultData={defaultData} />:
                    <Spinner status={loading} />
                }
            </AppModal>
        </>
    )
}

export default SubCategoryBtn;