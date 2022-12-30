import {basePath} from "./basePath";
const path = basePath + 'UserConversation/';

export const getUserConversation = async (id) => {
    return await fetch(path + id,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}, 
    })
}