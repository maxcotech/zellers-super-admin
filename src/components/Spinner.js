import React from 'react';

const Spinner = ({status = false,color = 'text-dark'}) => {

    return (status === true)? <div className={`spinner-grow ${color} spinner-grow-sm`} role="status">
    <span className="sr-only">Loading...</span>
</div> : <span></span>

}

export default Spinner;