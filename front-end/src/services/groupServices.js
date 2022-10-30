import {basePath} from "./basePath";
const path = basePath + 'groups' ;
const pathGrp = basePath + 'conversations' ;

export const getGroups = async (url='') => {
    return await fetch(path + '?' + url,{
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    });
};

export const getGroup = async (id) => {
    return await fetch(path +'/' +id, {
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    }).then(res => res.json());
};

export const patchGroup = async (group) => {
    return await fetch(path+'/'+ group.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')},
        body: JSON.stringify(group)
    }) ;
}

export const deleteGroup = async (id) => {
    return await fetch(path+'/'+id, {
        method: 'DELETE',
        headers: {authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')}
    }) ;
}

/**
 *
 * @param group { maxUsers: number, ownerID: number, isPrivate: boolean,
 * name: string, avatar: string, description: string } maxUsers is required and must be greater than 2.
 * ownerID is required. isPrivate is required. Other fields are optional.
 * @returns {Promise<Response>}
 */
export const createGroup = async (group) => {
    const data = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`
        },
        body: JSON.stringify(group)
    });
    try {
        const newGroup = await data.json() ;
        await addToGroup(newGroup.ownerID, newGroup) ;
    } catch(err){ return err }

};

export const addToGroup = async (user,group) => {
    return await fetch(pathGrp,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`
        },
        body: JSON.stringify({
            userID: user,
            groupID: group.id,
            name: group.name,
            avatar: group?.avatar ?? null
        })
    })
};

export const createConversation = async (user,answer) => {
    return await fetch(pathGrp,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`
        },
        body: JSON.stringify({
            userID: user,
            answerID: answer.id,
            name: answer.name
        })
    })
};

export const getConversations = async (user) => {
  return await fetch(pathGrp + '?userID=' + user, {
      headers:{authorization: `Bearer ${localStorage.getItem('esgi-wtr-user-token')}`}
  }) ;
};

