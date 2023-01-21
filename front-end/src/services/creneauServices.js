import {basePath} from "./basePath";
const pathCreneau = basePath + 'creneaux' ;

export const getCreneaux = async (url='') => {
    return await fetch(pathCreneau + '?' + url,{
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    });
};

export const getCreneauIs = async (url='') => {
    return await fetch(pathCreneau + url,{
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    });
}

export const getCreneauIsOffRoad = async (url='') => {
    return await fetch(pathCreneau + url,{
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    });
}

export const getCreneauIsSportDriver = async (url='') => {
    return await fetch(pathCreneau + url,{
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    });
}

export const patchCreneau = async (id, user) => {
    return await fetch(pathCreneau+'/'+ id, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}` ,
        },
        body: JSON.stringify({
            userID: user.id
        })
    });
}