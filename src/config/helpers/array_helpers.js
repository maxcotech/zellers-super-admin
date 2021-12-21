export const removeIrrelevantAttributes = (data,attributes = []) => {
    const keys = Object.keys(data);
    const newData = {};
    if(attributes !== null && Array.isArray(attributes) && attributes.length > 0){
        keys.forEach((key) => {
            if(!attributes.includes(key)){
                newData[key] = data[key];
            }
        });
        return newData;
    } else {
        return data;
    }
}