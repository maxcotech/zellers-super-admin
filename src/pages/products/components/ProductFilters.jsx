import { CButton, CCard, CCardBody, CCol, CFormGroup, CInputGroup, CInputGroupAppend, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from "@coreui/react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import HtmlEntity from "src/components/HtmlEntity";
import Spinner from "src/components/Spinner";
import { setCurrentParams } from "src/redux/actions/ProductActions";


const ProductFilters = (props) => {
    const { params, filters } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const { currency_sym } = useSelector(state => state.auth.currency);
    const loading = useSelector(state => state.app.loading)
    const setParams = (value, key) => {
        dispatch(setCurrentParams({
            ...params,
            [key]: value
        }))
    }
    const setPriceRange = (value,key) => {
        const otherKey = (key === "max_price")? "min_price":"max_price";
        const otherValue = (key === "max_price")? minPriceRef.current?.value ?? "":maxPriceRef.current?.value ?? "";
        dispatch(setCurrentParams({
            ...params,
            [key]:value,
            [otherKey]:otherValue
        }))
    }
    const searchRef = useRef(params.query ?? "");
    const minPriceRef = useRef(filters.price_range?.min_price ?? "");
    const maxPriceRef = useRef(filters.price_range?.max_price ?? "");
    const brandRef = useRef(params.brand ?? "");
    const ratingRef = useRef(params.rating ?? "");
    const onClearSearch = () => {
        setParams("","query");
        searchRef.current.value = "";
    }
    useEffect(() => {
        searchRef.current.value = params.query ?? "";
        minPriceRef.current.value = params.min_price ?? filters.price_range?.min_price ?? "";
        maxPriceRef.current.value = params.max_price ?? filters.price_range?.max_price ?? "";
        brandRef.current.value = params.brand ?? "";
        ratingRef.current.value = params.rating ?? "";
    },[filters]);

    const onApplyChanges = () => {
        props.onApplyChanges(params);
    }

    
    return (
        <>
            <CCard>
                <CCardBody>
                    <form>
                        <CFormGroup>
                            <CLabel>Search Product</CLabel>
                            <CInputGroup>
                                <input onChange={(e) => setParams(e.target.value,"query")} ref={searchRef} placeholder="Enter Search query" className="form-control" />
                                <CInputGroupAppend>
                                    <CButton onClick={onClearSearch} color="primary">Clear</CButton>
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

                                        <input onChange={(e) => setPriceRange(e.target.value,"min_price")} ref={minPriceRef} placeholder="Enter Min. price" className="form-control" />
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

                                        <input onChange={(e) => setPriceRange(e.target.value,"max_price")} ref={maxPriceRef} placeholder="Enter Max. price" className="form-control" />
                                    </CInputGroup>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CFormGroup>
                            <CLabel>Select Brand</CLabel>
                            <select ref={brandRef} onChange={(e) => setParams(e.target.value,"brand")} value={params.brand ?? ""} className="form-control">
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
                            <select ref={ratingRef} value={params.rating ?? ""}  onChange={(e) => setParams(e.target.value,"rating")} className="form-control">
                                <option value="">Select rating value</option>
                                <option value="4">Rating 4 and above</option>
                                <option value="3">Rating 3 and above</option>
                                <option value="2">Rating 2 and above</option>
                                <option value="1">Rating 1 and above</option>
                                <option value="0">Rating 0 and above</option>

                            </select>
                        </CFormGroup>



                        <CButton onClick={onApplyChanges} color="primary"><Spinner status={loading} /> Apply</CButton>
                    </form>
                </CCardBody>
            </CCard>
        </>
    )
}

export default ProductFilters;