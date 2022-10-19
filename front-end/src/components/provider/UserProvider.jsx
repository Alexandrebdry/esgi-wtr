import {createContext, useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import jwt_decode from "jwt-decode";
import axios from "axios";
import useScrollNavigate from "../hooks/useScrollNavigate";

export const UserContext = createContext({}) ;

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null) ;
    const [token, setToken] = useState(localStorage.getItem("esgi-wtr-user-token")) ;
    const [loader, setLoader] = useState(true) ;
    const axiosJWT = axios.create();
    const  scrollNavigate  = useScrollNavigate() ;

    const refreshToken = async () => {
        try {
            const response = await fetch('http://localhost:3001/auth/refresh', {
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: {"refreshToken": user.refreshToken}
                }
            ) ;
            const data = await response.json() ;
            setUser({...user, accessToken: data.accessToken, refreshToken: data.refreshToken}) ;
        } catch (err) {console.warn(err)}
    }
    axiosJWT.interceptors.response.use(
        async (response) => {
            let date = new Date() ;
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp < date.getTime() ) {
                const data = await refreshToken() ;
                response.headers['authorization'] = `Bearer ${data.accessToken}` ;
            }
            return response;
        }, (error) => {
            return Promise.reject(error);
        });

    useEffect(() => {
        if (!loader) {

            if(!user && !token) {
               // scrollNavigate("/login") ;
            }

        } else {
            if(token) {
                fetch('http://localhost:3001/auth/verify', {
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: {"token": token}
                }).then((response) => response.json()).then((data) => {
                   const user = data ;
                   if(user) setUser(user) ;

                });
            }
            setLoader(false) ;
        }

    },[user,loader]) ;

    const setUserInformation = (information) => {
        setUser(information) ;
        if(information === null) {
            localStorage.removeItem("esgi-wtr-user-token") ;
            setToken(null) ;
        } else {
            localStorage.setItem("esgi-wtr-user-token", information.accessToken) ;
            setToken(information.accessToken) ;
        }
    }

    return (
        loader === false ?
            <UserContext.Provider value={{ user, setUserInformation }}>
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