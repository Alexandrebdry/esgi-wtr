import {useContext, useEffect} from "react";
import {UserContext} from "../provider/UserProvider";

export default function ({}) {

    const {user} = useContext(UserContext) ;

    useEffect(() => {
        console.log(user) ;
    })

    return (
        <div className="home">
            <h1>Welcome!</h1>
        </div>
    )
}