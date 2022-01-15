import PropTypes from "prop-types";
import { useState } from "react";
import Spinner from "src/components/Spinner";

const SwapIndexSelect = (props) => {
    const [loading,setLoading] = useState(false);
    const onSwapPosition = (e) => {
        const data = {
            index:e.target.value,
            id:props.id
        }
        props.swapHandler(data,setLoading);
    }
    return (
        <>
            <Spinner status={loading} />
            <select onChange={onSwapPosition} {...props}>
                <option value="">Select Index</option>
                {
                    props.indexes.map((item,index) => (
                        <option value={item} key={props.id+"-"+index}>
                            {"Index "+item}
                        </option>
                    ))
                }
            </select>
        </>
    )
}

SwapIndexSelect.propTypes = {
    indexes: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    swapHandler: PropTypes.func.isRequired

}

export default SwapIndexSelect;