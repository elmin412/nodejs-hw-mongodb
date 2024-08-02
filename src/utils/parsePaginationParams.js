const parsedNumber = (value, defaultValue)=> {
    if (typeof value !== "string") {
        return defaultValue;
    }
    const parsedValue = parseInt(value);
    if(Number.isNaN(parsedValue)) {
        return defaultValue;
    }

    return parsedValue;
};


const parsePaginationParams = ({page, perPage}) => {

    const parsedPage = parsedNumber(page, 1)
    const parsedPerPagege = parsedNumber(perPage, 10)


    return {
        page: parsedPage,
        perPage: parsedPerPagege
    }
}

export default parsePaginationParams;