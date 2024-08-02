import  {typeContact}  from "../constants/constants.js";

const parsedBoolean = value => {
    if(typeof value !== "string") return;

    if (value === "true") return true;
    if (value === "false") return false;

    return parsedValue;
}
const parseContactFilterParams = ({type, isFavourite}) => {
    const parsedType = typeContact.includes(type) ? type : null;
    const parsedFavorite = parsedBoolean(isFavourite)

    return {
        type: parsedType,
        isFavourite: parsedFavorite,
    }
}

export default parseContactFilterParams;