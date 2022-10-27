import {createContext, useState} from "react";

export const GroupContext = createContext({}) ;

const GroupProvider = ({children}) => {
    const [groups, setGroups] = useState(null) ;
    const [conversations, setConversations] = useState(null) ;
    const [isGroupChanged, setIsGroupChanged] = useState(false) ;

    return (
        <GroupContext.Provider value={{groups, setGroups, conversations, setConversations, isGroupChanged, setIsGroupChanged}}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider ;