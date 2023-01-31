import {createContext, useState} from "react";
import io from "socket.io-client";

export const SocketContext = createContext({}) ;
const SocketProvider = ({children}) => {

    const [socket,setSocket] = useState({}) ;
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    const connectSocket = () => {

        const sock = io('http://localhost:4000',{
            withCredentials: true
        }) ;
        setSocket(sock) ;
        return sock ;
    }
    return(
       <SocketContext.Provider value={{connectSocket, socket}}>
           {children}
       </SocketContext.Provider>
    );
}

export default SocketProvider ;
