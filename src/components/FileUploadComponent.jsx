import { CCard, CCardBody, CCardFooter, CLabel } from "@coreui/react";
import { useRef, useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const FileUploadComponent = (props) => {
    const [loading,setLoading] = useState(false)
    const fileInputRef = useRef();

    const onFileChange = (e) => {
        const file =  e.target.files[0];
        console.log('file changed');
        props.onFileChanged(file,(val) => setLoading(val));
    }
    
    const triggerFileChange = (e) => {
        fileInputRef.current?.click();
    }

    return (
        <div style={{
            width:props.width ?? "100%",
            height:props.height ?? "auto",
        }}>
            <CCard style={{padding:"0px"}}>
                <CCardBody style={{padding:"0px"}}>
                    {
                        (loading)? 
                    <div className="text-center" style={{height:"100%",width:"100%"}}> 
                        <Spinner status={loading} />
                    </div>:
                        <div style={{ 
                            borderRadius:"5px",
                            padding:"10px",
                            border:"1px dashed silver"
                        }} >
                        <CLabel >
                            <img onClick={triggerFileChange}  src={(props.file_path !== ""  && props.file_path !==  null && typeof props.file_path !== "undefined")? props.file_path :  "images/no-image-placeholder.png"} style={{
                                display:"block",height:"100%",maxWidth:"100%",borderRadius:"5px"}} />
                        </CLabel>
                            <input onChange={onFileChange} ref={fileInputRef}  id={props.id ?? "imagei"} style={{display:"none"}} className="form-control imagei" type="file" />
                        </div>
                    }
                    
                </CCardBody>
                {
                    (props.caption === null || props.caption === "")?<></>:
                        <CCardFooter>
                            <p className="text-center">{props.caption ?? "No Caption"}</p>
                        </CCardFooter>
                }
               
            </CCard>
        </div>
    )
}

FileUploadComponent.propTypes = {
    id:PropTypes.string,
    onFileChanged:PropTypes.func,
    width:PropTypes.number,
    height:PropTypes.number,
    caption:PropTypes.string,
    file_path:PropTypes.string
}

export default FileUploadComponent;