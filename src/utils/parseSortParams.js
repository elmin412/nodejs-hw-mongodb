import { sortOrderList } from "../constants/sort-index.js";


const parseSortParams = ({sortBy, sortOrder}, fieldList) => {
    const parseSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parseSortBy = fieldList.includes(sortBy) ? sortBy : [0];


    return {
        sortBy: parseSortBy,
        sortOrder: parseSortOrder,
    }
}

export default parseSortParams;