import { CButton } from "@coreui/react";
import React, { useRef } from "react";
import { toast } from "react-toastify";


const CopyBox = (props) => {

    const boxRef = useRef();

    const onCopy = () => {
        navigator.clipboard.writeText(boxRef?.current?.innerText?.trim())
        .then((res)=>{
            toast.success("Copied content to clipboard.",{
                position:"bottom-center"
            })
        })
    }

    return (
        <div className="styled-scrollbar"  style={{
            minHeight:props.minHeight ?? "1%",
            minWidth:props.minWidth ?? "1%",
            maxWidth:props.maxWidth ?? "100%",
            maxHeight:props.maxHeight ?? "100%",
            overflowY:props.overflowY ?? "auto",
            margin:"4px"
        }}>
            <div ref={boxRef}>
                <span ref={boxRef}>
                {props.children}
                {" "}
                </span>
                <CButton onClick={onCopy} size="sm" color="primary">Copy</CButton>

            </div>
        </div>
    )
}

export default CopyBox;