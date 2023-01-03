import {basePath} from "./basePath";
const path = basePath + 'asks' ;

export const sendAsk = async (userID, groupID) => {
    return await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`
        },
        body: JSON.stringify({
            userID: userID,
            groupID: groupID
        })
    }) ;
}

export const getAllAsksFromAGroup = async (groupID) => {
    return await fetch(path+'?groupID='+ groupID, {
        headers: {authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`}
    }) ;
} ;

export const deleteAsk = async (id) => {
    return await fetch(path+'/'+id, {
        method: 'DELETE',
        headers: {authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`}
    });
}