import { useState } from "react";
import Spinner from "src/components/Spinner";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import PropTypes  from "prop-types";
import { confirmAction } from "src/config/helpers/message_helpers";



const SelectResourceStatus = (props) => {
    const [loading,setLoading] = useState(false);
    const onChangeStatus = async (e) => {
        const data = {
            status:e.target.value,
            id:props.id
        }
        if(props.shouldWarn){
            if(await confirmAction({text:"This action may affect the accessibility of other related entities."})){
                props.changeHandler(data,setLoading);
            }
        } else {
            props.changeHandler(data,setLoading);

        }
    }

    return (
        <>
            <Spinner status={loading} />
            <select onChange={onChangeStatus} {...props}>
                <option value="">Select a status</option>
                <option value={resourceStatus.active}>Active</option>
                <option value={resourceStatus.inactive}>Inactive</option>
                <option value={resourceStatus.in_draft}>In Draft</option>
                <option value={resourceStatus.in_review}>In Review</option>
                <option value={resourceStatus.blacklisted}>Blacklisted</option>
            </select>
        </>
    )
}

SelectResourceStatus.propTypes = {
    changeHandler: PropTypes.func,
    id: PropTypes.number,
    shouldWarn: PropTypes.bool,
    value: PropTypes.number
}

export default SelectResourceStatus;