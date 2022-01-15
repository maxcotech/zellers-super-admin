import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import ExpandableImage from "src/components/ExpandableImage";
import LoadingBtn from "src/components/LoadingBtn";
import PaginationComponent from "src/components/PaginationComponent";
import { confirmAction } from "src/config/helpers/message_helpers";
import { createCountry, defaultCountriesUrl, deleteCountry, fetchCountries } from "src/redux/actions/CountryActions";
import CountryForm from "./CountryForm";
import CurrenciesBtn from "./CurrenciesBtn";
import StatesBtn from "./StatesBtn";
import UpdateCountryBtn from "./UpdateCountryBtn";


const Countries = (props) => {
    const dispatch = useDispatch();
    const [showCreateForm,setShowCreateForm] = useState(false);
    const { countries, countries_params, countries_links,current_countries_link } = useSelector(state => state.country);
    const onPaginationClick = (url) => {
        dispatch(fetchCountries(url, countries_params));
    }
    useEffect(() => {
        dispatch(fetchCountries(defaultCountriesUrl, { ...countries_params, paginate: 1 }));
    }, []);
    const onCreateCountry = (data,iloader = null) => {
        const formData = new FormData();
        const keys = Object.keys(data);
        for(let key of keys){
            console.log(key,data[key]);
            formData.append(key,data[key]);
        }
        dispatch(createCountry(formData,iloader,() => {
            dispatch(fetchCountries(current_countries_link,countries_params));
            setShowCreateForm(false);
        }))
    }

    const onDeleteCountry = async (data,iloader = null) => {
        if(await confirmAction({text:"Things may break, and resources affiliated with this country will lose stability, please ensure no resources depends on the selected country."})){
            dispatch(deleteCountry(data,iloader,() => {
                dispatch(fetchCountries(current_countries_link,countries_params))
            }))
        }
    }
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 className="inline-block">Countries</h4>
                    <div className="card-header-actions">
                        <CButton onClick={() => setShowCreateForm(true)} color="primary">+ Add Country</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (countries.length > 0)? 
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Country&nbsp;Logo</th>
                                        <th>Country&nbsp;Name</th>
                                        <th>Country&nbsp;Code</th>
                                        <th>Country&nbsp;Tel&nbsp;Code</th>
                                        <th>Actions</th>
                                        <th>Attributes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        countries.map((item,index) => (
                                            <tr key={"countries_"+item.id}>
                                                <th>{index + 1}</th>
                                                <td><ExpandableImage width={"auto"} height={"50px"} src={item.country_logo} /></td>
                                                <td>{item.country_name}</td>
                                                <td>{item.country_code}</td>
                                                <td>{item.country_tel_code}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <UpdateCountryBtn onComplete={() => dispatch(fetchCountries(current_countries_link,countries_params))} country={item} />
                                                        <LoadingBtn onClick={onDeleteCountry} data={item.id} color="danger">Delete</LoadingBtn>
                                                    </CButtonGroup>
                                                </td>
                                                <td>
                                                    <CButtonGroup>
                                                        <StatesBtn country={item} />
                                                        <CurrenciesBtn country={item} />

                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                         
                                        
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Country Found</h4>
                            <p>You are yet to create country records.</p>
                        </CAlert>

                    }
                    
                    <div>
                        <PaginationComponent onClick={onPaginationClick} links={countries_links} />
                    </div>
                </CCardBody>
            </CCard>
            <AppModal title="Create Country" show={showCreateForm} onClose={() => setShowCreateForm(false)}>
                {
                    (showCreateForm)? <CountryForm submitHandler={onCreateCountry} /> : <></>
                }
            </AppModal>
        </>
    )
}

export default Countries;

// countries(pin):
// countries_params(pin):
// current_countries_link(pin):null
// countries_links(pin):

