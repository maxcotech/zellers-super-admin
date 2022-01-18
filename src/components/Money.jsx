
import { useSelector } from 'react-redux';
import HtmlEntity from './HtmlEntity';

const Money = (props) => {
    const {currency_sym} = useSelector(state => state.auth.currency);
    return (
        <>
            {
                (props.noSymbol === true)? <></>:<HtmlEntity>{currency_sym}</HtmlEntity>
            }
            <span>{new Intl.NumberFormat('en-US').format(parseFloat(props.children,10))}</span>
        </>
    )
}

export default Money;