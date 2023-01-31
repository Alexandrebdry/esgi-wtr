import {createContext, useState} from "react";

export const AdvisorContext = createContext({}) ;

const AdvisorProvider = ({children}) => {
    const [advisors, setAdvisors] = useState(null) ;
    // const [conversations, setConversations] = useState(null) ;
    // const [isGroupChanged, setIsGroupChanged] = useState(false) ;

    return (
        <AdvisorContext.Provider value={{advisors, setAdvisors}}>
            {children}
        </AdvisorContext.Provider>
    )
}

export default AdvisorProvider ;