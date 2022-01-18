import CIcon from "@coreui/icons-react";
import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardGroup, CCardHeader, CCol, CContainer, CInputGroup, CInputGroupPrepend, CProgress, CRow, CWidgetIcon, CWidgetProgress, CWidgetProgressIcon } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { creditWallet, defaultWalletUrl, fetchWallet } from "src/redux/actions/WalletActions";
import TransactionsTable from "./components/TransactionsTable";
import WalletFiltersForm from "./components/WalletFiltersForm";
import WalletTransactionForm from "./components/WalletTransactionForm";
import { debitWallet } from './../../../redux/actions/WalletActions';
import Money from './../../../components/Money';


const Wallet = (props) => {
    const [showFilters, setShowFilters] = useState(false);
    const loading = useSelector(state => state.app.loading);
    const [showDebitForm,setShowDebitForm] = useState(false);
    const [showCreditForm,setShowCreditForm] = useState(false);
    const {
        total_balance, locked_credits, unlocked_credits,
        total_debits, links, params, transactions,current_link } = useSelector(state => state.wallet);

    const dispatch = useDispatch();
    const onPaginationClick = (url) => {
        dispatch(fetchWallet(url, params))
    }
    const onLedgerTypeChange = (e) => {
        const val = e.target.value;
        dispatch(fetchWallet(defaultWalletUrl, { ...params, ledger_type: val }))
    }

    const onFilter = (filters) => {
        dispatch(fetchWallet(defaultWalletUrl, { ...params, ...filters },
            () => setShowFilters(false)
        ))
    }
   
    const onDebitWallet = (data,iloader = null) => {
        dispatch(debitWallet(data,iloader,() => {
            dispatch(fetchWallet(current_link,params,() => {
                setShowDebitForm(false);
            }))
        }))
    }
    const onCreditWallet = (data,iloader = null) => {
        dispatch(creditWallet(data,iloader,() => {
            dispatch(fetchWallet(current_link,params,() => {
                setShowCreditForm(false);
            }))
        }))
    }

    useEffect(() => {
        dispatch(fetchWallet(defaultWalletUrl, params));
    }, [])
    return (
        <div>
            <CRow>
                <CCol xs="12" sm="6" lg="3">
                    <CWidgetIcon text="Total Balance" header={<Money>{total_balance}</Money>} color="gradient-primary" iconPadding={false}>
                        <CIcon width={24} name="cil-chartPie" />
                    </CWidgetIcon>

                </CCol>
                <CCol xs="12" sm="6" lg="3">
                    <CWidgetIcon text="Pending Credit" header={<Money>{locked_credits}</Money>} color="gradient-warning" iconPadding={false}>
                        <CIcon width={24} name="cil-chartPie" />
                    </CWidgetIcon>

                </CCol>
                <CCol xs="12" sm="6" lg="3">
                    <CWidgetIcon text="Total Credit" header={<Money>{unlocked_credits}</Money>} color="gradient-success" iconPadding={false}>
                        <CIcon width={24} name="cil-chartPie" />
                    </CWidgetIcon>

                </CCol>
                <CCol xs="12" sm="6" lg="3">
                    <CWidgetIcon text="Total Debit" header={<Money>{total_debits}</Money>} color="gradient-danger" iconPadding={false}>
                        <CIcon width={24} name="cil-chartPie" />
                    </CWidgetIcon>

                </CCol>
            </CRow>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block"><Spinner status={loading} /> Wallet</h4>
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
                                    <CButton onClick={() => setShowDebitForm(true)} color="light">Debit</CButton>
                                    <CButton onClick={() => setShowCreditForm(true)} color="dark">Credit</CButton>
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (transactions.length > 0) ?
                            <div>
                                <TransactionsTable transactions={transactions} />
                                <div>
                                    <PaginationComponent onClick={onPaginationClick} links={links} />
                                </div>
                            </div> :
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
            <AppModal title="Debit Wallet" show={showDebitForm} onClose={() => setShowDebitForm(false)}>
                <WalletTransactionForm submitHandler={onDebitWallet} />
            </AppModal>
            <AppModal title="Credit Wallet" show={showCreditForm} onClose={() => setShowCreditForm(false)}>
                <WalletTransactionForm submitHandler={onCreditWallet} />
            </AppModal>
        </div>
    )
}

export default Wallet;