import { contactFieldList, sortOrderList } from "../constants/constants.js";
import Contact from "../db/models/Contact.js";
import calculatePaginationData  from '../utils/calculatePaginationData.js';


export const getContacts = async ({
    filter, 
    page, 
    perPage, 
    sortBy = contactFieldList[0], 
    sortOrder = sortOrderList[0]
    }) => {
    const skip = (page - 1) * perPage;

    
    const databaseQuery = Contact.find();

    if(filter.userId) {
        databaseQuery.where('userId').equals(filter.userId);
    }
    if(filter.type) {
        databaseQuery.where('contactType').equals(filter.type);
    }
    if(filter.isFavourite) {
        databaseQuery.where('isFavourite').equals(filter.isFavourite);
    }
    
    const data = await databaseQuery
    .skip(skip)
    .limit(perPage)
    .sort({[sortBy]: sortOrder});
    const totalItems = await Contact.find({userId: filter.userId}).countDocuments();
    const {totalPages, hasNextPage, hasPrevPage} = calculatePaginationData({total: totalItems, perPage, page});

    console.log(totalItems)
    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasNextPage,
        hasPrevPage,
        
    }
}
export const getContact = filter => Contact.findOne(filter);


export const addContact = data => Contact.create(data);

export const upserContact = async (filter, data, options = {}) => {
    const result = await Contact.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ... options,
    });
    if (!result || !result.value) return null;

    const isNew = Boolean.apply(result?.lastErrorObject?.upserted);

    return {
        data: result.value,
        isNew,
    }
};

export const deleteContaact = filter => Contact.findOneAndDelete(filter);