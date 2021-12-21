export const valueExistsInDataList = (value,datalistRef) => {
    let result = false;
    if(datalistRef && datalistRef.current && datalistRef.current?.hasChildNodes()){
        datalistRef.current?.childNodes.forEach((item) => {
            if(item.value === value){
                result = true;
            }
        })
    }
    return result;
}