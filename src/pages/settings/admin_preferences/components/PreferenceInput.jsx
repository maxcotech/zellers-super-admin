import { CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupText, CLabel } from "@coreui/react";
import { preferenceKeys } from "src/config/app_config/user_config";
import { normalizeSnakeCasing } from "src/config/helpers/string_helpers";

const PreferenceInput = (props) => {
    const {item, changeHandler} = props;
    const getLabel = (label) => (<CLabel style={{textTransform:"capitalize"}}>{normalizeSnakeCasing(label)}:<span className="text-danger">*</span></CLabel>)
    switch(item.preference_key){
        case preferenceKeys.commissionPreference:
            return (
                <>
                    <CFormGroup>
                        {getLabel(item.preference_key)}
                        <CInputGroup>
                            <input placeholder="Enter Commission Percentage" onChange={(e) => changeHandler(e.target.value,item.preference_key)} value={item.preference_value} type="number" className="form-control"  />
                            <CInputGroupAppend>
                                <CInputGroupText>%</CInputGroupText>
                            </CInputGroupAppend>
                            <span className="form-text text-muted">
                                This will enable you to specify the fallback percentage of the customer's payment on an item that will be remitted to your wallet as admin commission when the commission is not specified in the product category.
                            </span>
                        </CInputGroup>
                    </CFormGroup>
                </>
            )
        default: return (
            <>
                <CFormGroup>
                    {getLabel(item.preference_key)}
                    <input onChange={(e) => changeHandler(e.target.value,item.preference_key)} value={item.preference_value} type="text" className="form-control"  />
                </CFormGroup>
            </>
        )
    }
}

export default PreferenceInput;