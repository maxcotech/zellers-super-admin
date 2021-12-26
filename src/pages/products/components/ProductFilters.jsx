import { CButton, CCard, CCardBody, CCol, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import HtmlEntity from "src/components/HtmlEntity";
import { setCurrentParams } from "src/redux/actions/ProductActions";


const ProductFilters = (props) => {
    const { params, filters } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { currency_sym } = useSelector(state => state.auth.currency);
    const setParams = (value, key) => {
        dispatch(setCurrentParams({
            ...params,
            [key]: value
        }))
    }
    const searchRef = useRef();
    useEffect(() => {
        searchRef.current.value = params.query ?? "";

    }, []);


    return (
        <>
            <CCard>
                <CCardBody>
                    <form>
                        <CFormGroup>
                            <CLabel>Search Product</CLabel>
                            <CInputGroup>
                                <input ref={searchRef} placeholder="Enter Search query" className="form-control" />
                                <CInputGroupAppend>
                                    <CButton color="primary">Clear</CButton>
                                </CInputGroupAppend>
                            </CInputGroup>
                        </CFormGroup>

                        <CRow>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Minimum Price</CLabel>
                                    <CInputGroup>
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <HtmlEntity>
                                                    {currency_sym}
                                                </HtmlEntity>
                                            </CInputGroupText>

                                        </CInputGroupPrepend>

                                        <input placeholder="Enter Min. price" className="form-control" />
                                    </CInputGroup>
                                </CFormGroup>
                            </CCol>
                            <CCol>
                                <CFormGroup>
                                    <CLabel>Maximum Price</CLabel>
                                    <CInputGroup>
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <HtmlEntity>
                                                    {currency_sym}
                                                </HtmlEntity>
                                            </CInputGroupText>

                                        </CInputGroupPrepend>

                                        <input placeholder="Enter Max. price" className="form-control" />
                                    </CInputGroup>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CFormGroup>
                            <CLabel>Select Brand</CLabel>
                            <select className="form-control">
                                <option value="">Select Brand</option>
                                {
                                    filters.brands?.map((item) => (
                                        <option value={item.id} key={'brand_' + item.id}>
                                            {item.brand_name}
                                        </option>
                                    ))
                                }
                            </select>
                        </CFormGroup>
                        <CFormGroup>
                            <CLabel>Rating Stars</CLabel>
                            <select className="form-control">
                                <option value="">Select rating value</option>
                                <option value="4">Rating 4 and above</option>
                                <option value="3">Rating 3 and above</option>
                                <option value="2">Rating 2 and above</option>
                                <option value="1">Rating 1 and above</option>
                                <option value="0">Rating 0 and above</option>

                            </select>
                        </CFormGroup>



                        <CButton color="primary">Apply</CButton>
                    </form>
                </CCardBody>
            </CCard>
        </>
    )
}

export default ProductFilters;