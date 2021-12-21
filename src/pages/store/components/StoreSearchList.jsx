import { CCard, CCardBody } from "@coreui/react";
import PropTypes from "prop-types";
import CircleAvatar from "src/components/CircleAvatar";

const StoreSearchList = (props) => {
    if(props.list.length > 0){
        return (
            <>
                <CCard style={{marginTop:"10px"}}>
                    <CCardBody>
                        <table className="table striped">
                        {
                            props.list.map((item) => (
                                <tr onClick={() => props.onSelectItem(item)} className="hoverable" key={item.id} >
                                    <td style={{width:"20%"}}><CircleAvatar radius={50} src={item.store_logo}/></td>
                                    <td style={{width:"70%"}}><h6>{item.store_name}</h6><div>{item.store_slug}</div></td>
                                    <td><b style={{fontSize:"2em"}} dangerouslySetInnerHTML={{__html:"&#8594;"}} /></td>
                                </tr>
                            ))
                        }
                        </table>
                    </CCardBody>
                </CCard>
            
            </>
        )
    } else {
        return <></>
    }
}

StoreSearchList.propTypes = {
    list: PropTypes.array,
    onSelectItem: PropTypes.func,
   
}

export default StoreSearchList;