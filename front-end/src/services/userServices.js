import {basePath} from "./basePath";
const path = basePath + 'setUserStatus/';
const pathGetUser = basePath + 'getUser/';

export const setAdvisorStatus = async (id, status) => {
    return await fetch(path + id, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')},
        body: JSON.stringify({
            status: status
        })
    })
}

export const getUserById = async (id) => {
    return await fetch(pathGetUser + id,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}, 
    })
}
