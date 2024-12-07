import Contact from "../db/models/Contact.js";


export const getContacts = () =>Contact.find();

export const getContactById = contactId => Contact.findById(contactId);

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