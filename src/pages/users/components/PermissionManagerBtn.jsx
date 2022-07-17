import { CButton } from "@coreui/react";
import { useState } from "react";
import AppModal from "src/components/AppModal";
import PermissionManager from "./PermissionManager";

const PermissionManagerBtn = ({size,children,user,onComplete}) => {
    
    const [visible,setVisible] = useState(false);
    const onComplete2 = () => {
        setVisible(false);
        if(onComplete) onComplete();
    }
    return (
        <>
            <AppModal closeOnBackdrop={false} title={`Permissions for ${user.first_name} ${user.last_name}`} show={visible} onClose={() => setVisible(false)}>
                {
                    (visible)? <PermissionManager user={user} onComplete={onComplete2} />:<></>
                }
            </AppModal>
            <CButton onClick={() => setVisible(true)} color="dark" size={size}>{children}</CButton>

        </>
    )
}

export default PermissionManagerBtn;