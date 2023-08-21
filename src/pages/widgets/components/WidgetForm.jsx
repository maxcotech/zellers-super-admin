import { CButton, CFormGroup, CLabel } from "@coreui/react";
import { useState } from "react";
import Spinner from "src/components/Spinner";
import PropTypes from "prop-types";

const WidgetForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState(props.defaultData ?? {
        widget_title: "",
        device_type: "",
        widget_link_text: "",
        widget_link_address: "",
        widget_type: "",
        is_block: ""
    });
    const setFormValue = (e, key) => {
        setFormState({
            ...formState,
            [key]: e.target.value
        })
    }
    const onSubmit = () => {
        props.submitHandler(formState, setLoading);
    }

    return (
        <>
            <form>
                <CFormGroup>
                    <CLabel>Widget Title:</CLabel>
                    <input onChange={(e) => setFormValue(e, "widget_title")} value={formState.widget_title} placeholder="Enter Widget Title" className="form-control" />
                    <small className="form-text text-muted">
                        A text that will appear at the top of the widget. <b>Eg: Trendy Shoes below 40usd</b>
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Widget Link Text:</CLabel>
                    <input onChange={(e) => setFormValue(e, "widget_link_text")} value={formState.widget_link_text} placeholder="Enter Link Text" className="form-control" />
                    <small className="form-text text-muted">
                        A clickable text that will appear at the base of the widget. <b>Eg: Learn More...</b>
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Widget Link Address:</CLabel>
                    <input onChange={(e) => setFormValue(e, "widget_link_address")} value={formState.widget_link_address} placeholder="Enter Link Address" className="form-control" />
                    <small className="text-muted form-text">
                        The address to the page that the browser navigates to when the user clicks the link text.\n
                        It also acts as a fallback url when the individual widget items does not specify specific urls.
                        <b> Eg: https://www.zellers.com/catalog</b>
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Widget Type:</CLabel>
                    <select onChange={(e) => setFormValue(e, "widget_type")} value={formState.widget_type} className="form-control" >
                        <option value="">Select Widget Type</option>
                        <option value="1">Single Item Widget</option>
                        <option value="4">Four Item Widget</option>
                        <option value="10">Landscape multiitem widget</option>
                    </select>
                    <small className="text-muted form-text">
                        This determines the layout of the widget.
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Supported Device:</CLabel>
                    <select onChange={(e) => setFormValue(e, "device_type")} value={formState.device_type} className="form-control" >
                        <option value="">Select Device</option>
                        <option value="1">Mobile Applications only</option>
                        <option value="2">Desktop and website applications only</option>
                        <option value="3">All Devices</option>
                    </select>
                    <small className="text-muted form-text">
                        This determines the type of App / Display where this widget will be rendered.
                    </small>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Element Type:</CLabel>
                    <select onChange={(e) => setFormValue(e, "is_block")} value={formState.is_block} className="form-control" >
                        <option value="">Select Element Type</option>
                        <option value="0">Inline Element</option>
                        <option value="1">Block Level Element</option>
                    </select>
                    <small className="text-muted form-text">
                        Determines whether this widget can have other widgets in the same row.
                        Inline widgets can accomodate other inline widgets in the same row, while block widgets can not.
                    </small>
                </CFormGroup>

                <CButton block={false} onClick={onSubmit} color="primary"><Spinner status={loading} /> {props.btn_title ?? "Continue"}</CButton>

            </form>
        </>
    )
}

WidgetForm.propTypes = {
    submitHandler: PropTypes.func.isRequired,
    defaultData: PropTypes.object,
    btn_title: PropTypes.string
}

export default WidgetForm;