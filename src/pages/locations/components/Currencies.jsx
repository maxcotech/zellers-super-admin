import { CAlert, CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import HtmlEntity from "src/components/HtmlEntity";
import LoadingBtn from "src/components/LoadingBtn";
import { confirmAction } from "src/config/helpers/message_helpers";
import { createCurrency, deleteCurrency, fetchCurrencies } from "src/redux/actions/CountryActions";
import CurrenciesForm from "./CurrenciesForm";
import UpdateCurrencyBtn from "./UpdateCurrencyBtn";

const Currencies = (props) => {
    const {country} = props;
    const [showCreateForm,setShowCreateForm] = useState(false);
    const {currencies} = useSelector(state => state.country);
    const dispatch = useDispatch();
    const onCreateCurrency = (data,iloader = null) => {
        dispatch(createCurrency(data,iloader,() => {
            dispatch(fetchCurrencies({country_id:country.id},iloader,() => setShowCreateForm(false)))
        }))
    }

    const onDeleteCurrency = async (data,iloader = null) => {
        if(await confirmAction({text:"Things may break, resources that depends on the selected currency may become unstable"})){
            dispatch(deleteCurrency(data,iloader,() => {
                dispatch(fetchCurrencies({country_id:country.id}));
            }))        
        }
        
    }
    
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block">Currency List</h4>
                    <div className="card-header-actions">
                        <CButton onClick={() => setShowCreateForm(true)} color="primary">+ Add Currency</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (currencies.length > 0)?
                        <div className="table-responsive">
                            <table className="table table-condensed">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Currency Name</th>
                                        <th>Currency Code</th>
                                        <th>Currency Symbol</th>
                                        <th>Base Rate</th>
                                        <th>Base Currency</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currencies.map((item,index) => (
                                            <tr key={'currencies_'+item.id}>
                                                <th>{index + 1}</th>
                                                <td>{item.currency_name}</td>
                                                <td>{item.currency_code}</td>
                                                <td><HtmlEntity>{item.currency_sym}</HtmlEntity></td>
                                                <td><HtmlEntity>{item.currency_sym+""+item.base_rate}</HtmlEntity></td>
                                                <td>{(item.is_base_currency === 1)? <CBadge color="primary">TRUE</CBadge>:<CBadge color="success">FALSE</CBadge>}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <UpdateCurrencyBtn onComplete={() => dispatch(fetchCurrencies({country_id:country.id}))} currency={item} />
                                                        <LoadingBtn data={item.id} onClick={onDeleteCurrency} color="danger">Delete</LoadingBtn>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:<CAlert color="info">
                            <h4>No Currency Found</h4>
                            <p>You are yet to add a currency for this country</p>
                            <div><CButton onClick={() => setShowCreateForm(true)} color="primary">+ Add Currency</CButton></div>
                        </CAlert>
                    }
                </CCardBody>
            </CCard>
            <AppModal onClose={() => setShowCreateForm(false)} show={showCreateForm} title="Create Currency" >
                <CurrenciesForm submitHandler={onCreateCurrency} defaultData={{country_id:country.id}} />
            </AppModal>
        </>
    )
}

export default Currencies;