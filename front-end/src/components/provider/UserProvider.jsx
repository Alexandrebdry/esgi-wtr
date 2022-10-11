import {createContext, useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";

export const UserContext = createContext({}) ;

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null) ;
    const [loader, setLoader] = useState(true) ;

    useEffect(() => {
        console.log('cc')   ;
        setLoader(false);
    },[]) ;


    return (
        loader === false ?
            <UserContext.Provider value={{ user }}>
                {children}
            </UserContext.Provider>
        :
        <Backdrop
            sx={{ color: '#fff', zIndex: 15000 }}
            open={loader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default UserProvider ;