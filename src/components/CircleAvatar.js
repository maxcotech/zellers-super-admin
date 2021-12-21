import { CImg } from "@coreui/react";
import PropTypes  from "prop-types";


const CircleAvatar = (props) => {
    return (
        <CImg 
            style={{borderRadius:props.borderRadius ?? "50%"}}
            height={props.radius ?? 100} 
            width={props.radius ?? "auto"}
            src={props.src ?? 'images/no-image-placeholder.png'}
        />
    )
}

CircleAvatar.propTypes = {
    radius:PropTypes.number,
    src:PropTypes.string,
    borderRadius:PropTypes.string
}

export default CircleAvatar;