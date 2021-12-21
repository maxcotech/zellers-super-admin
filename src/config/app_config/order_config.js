import { normalizeSnakeCasing } from "../helpers/string_helpers";

export const orderStatuses = {
    PENDING : 1,
    AWAITING_FULFILLMENT : 2,
    AWAITING_SHIPPING : 3,
    PARTIALLY_SHIPPED : 4,
    SHIPPED : 5,
    AWAITING_PICKUP : 6,
    COMPLETED : 7,
    CANCELLED : 8,
    DISPUTED : 9,
    AWAITING_REFUND : 10,
    REFUNDED : 11
}

export const getOrderStatusText = (id) => {
    const keys = Object.keys(orderStatuses);
    const keyLength = keys.length;
    for(let i = 0; i < keyLength; i++){
        if(orderStatuses[keys[i]] == id){
            return normalizeSnakeCasing(keys[i].toLowerCase())
        }
    }
    return "N/A";
}