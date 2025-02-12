// takes a timestamp and returns date in yyyy-mm-dd format, which i can use to change the state of html date input
export function convertDate(timestamp) { 
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${
        date.getMonth()+1 < 12 ? (`0${date.getMonth()+1}`) : (date.getMonth()+1)
    }-${
        date.getDate() < 10 ? (`0${date.getDate()}`) : (date.getDate())
    }`
}

// clean code lmfao