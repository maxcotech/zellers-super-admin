import { useState } from "react";
import AppModal from "./AppModal";

const ExpandableImage = (props) => {
    const {src,title} = props;
    const [expand,setExpand] = useState(false)
    return (
        <>
            <AppModal title={title ?? "Zoom Mode"} show={expand} size="md" onClose={() =>setExpand(false)}>
                <img 
                    src={src ?? 'images/no-image-placeholder.png'} 
                    style={{display:"inline-block",width:"100%",borderRadius:"8px"}}
                />
            </AppModal>
            <img 
                onClick={() => setExpand(true)}
                src={src ?? 'images/no-image-placeholder.png'} 
                style={{width:"100px",display:"inline-block",borderRadius:"8px"}}
            />
        </>
        
        
    )
}

export default ExpandableImage;