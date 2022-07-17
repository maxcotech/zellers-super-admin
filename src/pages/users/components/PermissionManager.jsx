import { CCard, CCardBody, CCardFooter, CSwitch } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmptyPage from "src/components/EmptyPage";
import LoadingBtn from "src/components/LoadingBtn";
import { manageUserPermissions } from "src/redux/actions/UserActions";

const PermissionManager = ({user,onComplete}) => {
    const {permissions = []} = useSelector(state => state.auth?.user ?? {});
    const [userPermissions,setUserPermissions] = useState(user.permissions ?? []);
    const dispatch = useDispatch();
    const toggleChecked = (permission) => {
        if(userPermissions.includes(permission)){
            const intData = userPermissions.filter((item) => item !== permission);
            setUserPermissions(intData);
        } else {
            const intData = [...userPermissions,permission];
            setUserPermissions(intData);
        }
    }

    const onSubmit = (_,iloader) => {
        const data = {
            permissions: JSON.stringify(userPermissions),
            id: user.id
        }
        dispatch(manageUserPermissions(data,iloader,onComplete))
    }
    return (
        <CCard>
            <CCardBody>
                {
                    (permissions.length > 0)?
                    <div>
                        {
                            permissions.map((permission) => (
                                <div style={{marginTop:"15px"}} className="d-flex flex-row align-items-center">
                                    <CSwitch variant="3d" color="success" shape="pill" checked={userPermissions.includes(permission)} onChange={() => toggleChecked(permission)}/>
                                    <div style={{marginLeft:"10px",fontSize:"1.1em"}} className="text-lg">{permission}</div>
                                </div>
                            ))
                        }
                    </div>:<EmptyPage  />
                }
            </CCardBody>
            <CCardFooter>
                <LoadingBtn color="primary" onClick={onSubmit} data={user.id}>
                    Apply Changes
                </LoadingBtn>
            </CCardFooter>
        </CCard>
    )
}

export default PermissionManager;