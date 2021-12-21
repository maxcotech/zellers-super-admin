import { CButton } from "@coreui/react";
import React, { useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const LoadingBtn = (props) => {
    const [loading,setLoading] = useState(false);
    const onClick = (e) => {
        props.onClick(props.data,(val)=>setLoading(val),props.onComplete)
    }

    return (
        <CButton disabled={loading} block={props.block ?? false} color={props.color ?? "primary"} onClick={onClick}>
            <Spinner color={props.color == "light" ? "dark" : "light"} status={props.status ?? loading} /> {props.children}
        </CButton>
    )
}

LoadingBtn.propTypes = {
    onClick:PropTypes.func,
    data:PropTypes.any,
    color:PropTypes.string,
    onComplete:PropTypes.func
}

export default LoadingBtn;