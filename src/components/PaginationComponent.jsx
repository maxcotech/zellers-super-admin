import {Pagination,PaginationLink,PaginationItem} from "reactstrap";
import PropTypes from "prop-types";

const PaginationComponent = (props) => {
    const {links,onClick} = props;

    if(links.length){
        return (
            <div style={{marginTop:"15px"}}>
            <Pagination>
                {
                    links.map((item,index) => 
                        <PaginationItem
                            key={index}
                            active={item.active}
                            disabled={item.url === null? true:false}>
                                <PaginationLink 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClick(item.url)}}
                                href="#">
                                <span dangerouslySetInnerHTML={{__html:item.label}} />
                                </PaginationLink>
                            
                        </PaginationItem>
                    )
                }
            </Pagination>
            </div>
        )
    } else {
        return <></>
    }
}

PaginationComponent.propTypes = {
    links:PropTypes.array.isRequired,
    onClick:PropTypes.func.isRequired
}

export default PaginationComponent;