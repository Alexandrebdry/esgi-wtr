import {createContext, useState} from "react";

export const GroupContext = createContext({}) ;

const GroupProvider = ({children}) => {
    const [groups, setGroups] = useState(null) ;
    const [conversations, setConversations] = useState(null) ;

    return (
        <GroupContext.Provider value={{groups, setGroups, conversations, setConversations}}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider ;