
export function convertToDate(dateTimeStamp) {
    let data = new Date(dateTimeStamp);
    return data;
}

export function dataFormatadaFromTimeStamp(dateTimeStamp) {
    let data = convertToDate(dateTimeStamp);
    return data.toDateString();
}


