import { WALLET_ACTION_TYPES } from "../action_types/WalletActionTypes";


const initState = {
    transactions:[],
    total_balance:0,
    locked_credits:0,
    unlocked_credits:0,
    total_debits:0,
    current_link:null,
    links:[],
    params:{}
}

const WalletReducer = (state = initState,action) => {
    switch(action.type){
        case WALLET_ACTION_TYPES.setWalletData:
            const {data,links,total_balance,locked_credits,unlocked_credits,total_debits} = action.payload;
            return {
                ...state,
                transactions:data,
                links,total_balance,locked_credits,unlocked_credits,total_debits
            };
        case WALLET_ACTION_TYPES.setCurrentLink:
            return {
                ...state,
                current_link:action.payload,
            };
        case WALLET_ACTION_TYPES.setParams:
            return {
                ...state,
                params:action.payload
            };
        default: return state;
    }
}

export default WalletReducer;