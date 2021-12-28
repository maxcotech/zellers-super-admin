import CIcon from "@coreui/icons-react";
import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardGroup, CCardHeader, CCol, CContainer, CInputGroup, CInputGroupPrepend, CProgress, CRow, CWidgetProgressIcon } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import HtmlEntity from "src/components/HtmlEntity";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { defaultWalletUrl, fetchWallet } from "src/redux/actions/WalletActions";
import TransactionsTable from "./components/TransactionsTable";
import WalletFiltersForm from "./components/WalletFiltersForm";


const Wallet = (props) => {
    const {currency_sym} = useSelector(state => state.auth.currency);
    const [showFilters,setShowFilters] = useState(false);
    const loading = useSelector(state => state.app.loading);
    const {
        total_balance,locked_credits,unlocked_credits,
        total_debits,links,params,transactions} = useSelector(state => state.wallet);

    const dispatch = useDispatch();
    const onPaginationClick = (url) => {
        dispatch(fetchWallet(url,params))
    }
    const onLedgerTypeChange = (e) => {
        const val = e.target.value;
        dispatch(fetchWallet(defaultWalletUrl,{...params,ledger_type:val}))
    }

    const onFilter = (filters) => {
        dispatch(fetchWallet(defaultWalletUrl,{...params,...filters},
            () => setShowFilters(false)
        ))
    }

    useEffect(() => {
        dispatch(fetchWallet(defaultWalletUrl,params));
    },[])
    return ( 
        <div>
            <CRow>
                <CCol>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{currency_sym+total_balance}</HtmlEntity>}
                        text="Total Balance"
                        color="gradient-primary"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{currency_sym+locked_credits}</HtmlEntity>}
                        text="Pending Credit"
                        color="gradient-warning"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                
                <CCol>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{currency_sym+unlocked_credits}</HtmlEntity>}
                        text="Total Credits"
                        color="gradient-success"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol>
                    <CWidgetProgressIcon
                        header={<HtmlEntity>{currency_sym+total_debits}</HtmlEntity>}
                        text="Total Debits"
                        color="gradient-danger"
                        inverse={true}
                    >
                        <CIcon name="cil-chartPie" height="36" />
                    </CWidgetProgressIcon>
                </CCol>


            </CRow>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading}/> Wallet</h4>
                    <div className="card-header-actions">
                        <CRow>
                            <CCol lg={5}>
                                <select onChange={onLedgerTypeChange} value={params.ledger_type ?? ""} className="form-control inline-block" >
                                    <option value="">All Ledgers</option>
                                    <option value={1}>Credit Ledgers</option>
                                    <option value={0}>Debit Ledgers</option>
                                </select>
                            </CCol>
                            <CCol lg={7}>
                                <CButtonGroup className="inline-block">
                                    <CButton onClick={() => setShowFilters(true)} color="primary">Filters</CButton>
                                    <CButton color="light">Withdraw</CButton>
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (transactions.length > 0)? 
                        <div>
                            <TransactionsTable transactions={transactions} />
                            <div>
                                <PaginationComponent onClick={onPaginationClick} links={links} />
                            </div>
                        </div>:
                        <CAlert color="info">
                            <h4>No Transactions Found</h4>
                            <p>No transaction pertaining to your wallet has occurred in the selected filters.</p>
                        </CAlert>
                    }
                </CCardBody>
            </CCard>
            <AppModal title="Filter Transactions" show={showFilters} onClose={() => setShowFilters(false)}>
                <WalletFiltersForm submitHandler={onFilter} />
            </AppModal>
        </div>
    )
}

export default Wallet;