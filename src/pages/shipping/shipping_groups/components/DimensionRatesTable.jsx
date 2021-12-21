import {CCard,CCardBody,CAlert} from "@coreui/react";
import {useSelector} from "react-redux";
import HtmlEntity from "../../../../components/HtmlEntity";

const DimensionRatesTable = (props) => {
    const data = JSON.parse(props.data);
    const {currency_sym,currency_name} = useSelector(state => state.auth.currency)
    return (
        
        <CCard>
            <CCardBody>
                {
                    (data && Array.isArray(data) && data?.length > 0)?
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Minimum</th>
                                        <th>Maximum</th>
                                        <th>Rate (in {currency_name})</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item,index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.min}</td>
                                                <td>{item.max}</td>
                                                <td><HtmlEntity>{currency_sym}</HtmlEntity>{item.rate}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>:
                        <CAlert color="info">
                            <h4>No Dimensions Rates</h4>
                            <p>This Shipping group does not have any defined product dimensions rate list.</p>
                        </CAlert>


                }
            </CCardBody>
        </CCard>
    )
}

export default DimensionRatesTable;