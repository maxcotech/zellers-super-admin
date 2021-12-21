import {useState} from "react";
import PropTypes from "prop-types";
import {CAlert, CButton, CCol, CFormGroup, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow} from "@coreui/react";
import { useSelector } from "react-redux";
import HtmlEntity from "src/components/HtmlEntity";
import GenerateNumberOfDimensionRates from "./GenerateNumberOfDimensionRates";
import Spinner from "src/components/Spinner";


const ShippingGroupForm = (props) => {

    const getDefaultData = () => {
        if(props.defaultData){
            let newData = {};
            Object.keys(props.defaultData).forEach((key)=>{
                if(key === "dimension_range_rates"){
                    newData[key] = JSON.parse(props.defaultData[key])
                } else {
                    newData[key] = props.defaultData[key];
                }
            });
            return newData;
        } else {
            return null;
        }
    }

    const loading = useSelector(state => state.app.loading);
    const {currency_sym,currency_name} = useSelector(state => state.auth.currency);
    const defaultData = getDefaultData();
    const [formState,setFormState] = useState(defaultData ?? {
        group_name:"",shipping_rate:"",
        high_value_rate:"",low_value_rate:"",
        mid_value_rate:"",door_delivery_rate:"",
        delivery_duration:"",dimension_range_rates:[]
    });
    const setFormStateValue = (value,key) => {
        setFormState({
            ...formState,
            [key]:value
        })
    }

    
    const onAppendNewDimensionsRate = (value) => {
        const dlength = parseInt(value);
        if(dlength > 0){
            let newValue = formState.dimension_range_rates;
            if(!Array.isArray(newValue)){
                newValue = [];
            }
            for(let i = 0; i < dlength;i++){
                newValue.push({
                    min:"",max:"",rate:""
                })
            }
            setFormStateValue(newValue,'dimension_range_rates');
        }
    }

    const removeDimensionRow = (dindex) => {
        const newData = [];
        formState.dimension_range_rates.forEach((item,index) => {
            if(index !== dindex){
                newData.push(item);
            }
        })
        setFormStateValue(newData,'dimension_range_rates');
    }

    const setDimensionValue = (value,key,index) => {
        let newRates = formState.dimension_range_rates;
        newRates[index][key] = value;
        setFormStateValue(newRates,'dimension_range_rates');
    }

    const onFormSubmit = () => {
        const formData = {};
        Object.keys(formState).forEach((key) => {
            if(key === "dimension_range_rates"){
                formData[key] = JSON.stringify(formState[key]);
            } else {
                formData[key] = formState[key];
            }
        })
        props.submitHandler(formData);
    }

    return (
        <div>
           <form>
                <CFormGroup>
                    <CLabel>Shipping Group Name<span className="text-danger">*</span></CLabel>
                    <CInput onChange={(e) => setFormStateValue(e.target.value,"group_name")} value={formState.group_name} placeholder="Enter Shipping Group Name" />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Delivery Duration<span className="text-danger">*</span></CLabel>
                    <CInput type="number" onChange={(e) => setFormStateValue(e.target.value,"delivery_duration")} value={formState.delivery_duration} placeholder="How long (in days) does it take to deliver the product?" />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Shipping Rate (in {currency_name})<span className="text-danger">*</span></CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => setFormStateValue(e.target.value,"shipping_rate")} value={formState.shipping_rate} placeholder="Enter the shipping rate for this group" />
                    </CInputGroup>
                </CFormGroup>
                <div>
                    <CAlert color="info">
                        <h5>Additional Fees</h5>
                        <p>Fees set in subsequent fields will be added to the shipping rate. Hence , the total shipping cost will be equal to sum of all the fees.</p>
                    </CAlert>
                </div>
                <CFormGroup>
                    <CLabel>High Value Rate (in {currency_name})</CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => setFormStateValue(e.target.value,"high_value_rate")} value={formState.high_value_rate} placeholder="Enter Additional charges for high value products" />
                    </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Mid Value Rate (in {currency_name})</CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => setFormStateValue(e.target.value,"mid_value_rate")} value={formState.mid_value_rate} placeholder="Enter Additional charges for mid value products" />
                    </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Low Value Rate (in {currency_name})</CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => setFormStateValue(e.target.value,"low_value_rate")} value={formState.low_value_rate} placeholder="Enter Additional charges for low value products" />
                    </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Door Delivery Rate (in {currency_name})</CLabel>
                    <CInputGroup>
                        <CInputGroupPrepend>
                            <CInputGroupText>
                                <HtmlEntity>{currency_sym}</HtmlEntity>
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput onChange={(e) => setFormStateValue(e.target.value,"door_delivery_rate")} value={formState.door_delivery_rate} placeholder="Enter Additional charges for door delivery" />
                    </CInputGroup>
                </CFormGroup>
                {
                    (formState.dimension_range_rates?.length > 0)?
                        <CFormGroup >
                            <div style={{overflowX:"scroll"}}>
                            {
                                formState.dimension_range_rates.map((item,index) => (
                                    <p ><CRow key={index}>
                                        <CCol>
                                            <input onChange={(e) => setDimensionValue(e.target.value,'min',index)} placeholder="Enter Minimum dimension" value={item.min} className="form-control" type="number" />
                                        </CCol>
                                        <CCol>
                                            <input onChange={(e) => setDimensionValue(e.target.value,'max',index)} placeholder="Enter Maximum dimension" value={item.max} className="form-control" type="number" />
                                        </CCol>
                                        <CCol>
                                            <input onChange={(e) => setDimensionValue(e.target.value,'rate',index)} placeholder="Enter rate" value={item.rate} className="form-control" type="number" />
                                        </CCol>
                                        <CCol lg={1}><CButton onClick={() => removeDimensionRow(index)} color="primary">x</CButton></CCol>
                                    </CRow></p>
                                ))
                            }
                            </div>
                            <div>
                                <GenerateNumberOfDimensionRates color="light" onComplete={(num) => onAppendNewDimensionsRate(num)}>
                                    Append More Rows
                                </GenerateNumberOfDimensionRates>
                            </div>
                        </CFormGroup>:
                        <CAlert className="text-center" color="info">
                            <p>Start Creating dimension range rates</p>
                            <GenerateNumberOfDimensionRates onComplete={(num) => onAppendNewDimensionsRate(num)}>
                                Create Rates
                            </GenerateNumberOfDimensionRates>
                        </CAlert>
                }
                <CFormGroup>
                    <CButton onClick={onFormSubmit} block={true} color="primary">
                      <Spinner status={loading} /> Submit
                    </CButton>
                </CFormGroup>
           </form>
        </div>
    )


}

ShippingGroupForm.propTypes = {
    defaultData:PropTypes.object,
    submitHandler:PropTypes.func
}

export default ShippingGroupForm;