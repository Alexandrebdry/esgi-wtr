import {basePath} from "./basePath";
const path = basePath + 'groups' ;

export const getGroups = async () => {
    return await fetch(path)
        .then(res => res.json());
};

export const getGroup = async (id) => {
    return await fetch(path +'/' +id)
        .then(res => res.json());
};

/**
 *
 * @param group { maxUsers: number, ownerID: number, isPrivate: boolean,
 * name: string, avatar: string, description: string } maxUsers is required and must be greater than 2.
 * ownerID is required. isPrivate is required. Other fields are optional.
 * @returns {Promise<Response>}
 */
export const createGroup = async (group) => {
    return await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(group)
    });
};

