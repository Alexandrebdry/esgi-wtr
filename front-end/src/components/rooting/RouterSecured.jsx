import {hasPermission, PERMISSIONS, useRole} from "./permissions";
import {useContext} from "react";
import {UserContext} from "../provider/UserProvider";
import NotFound from "../pages/errors/NotFound";

export default function RouterSecured({children, scopes = []}) {
    const { user } = useContext(UserContext) ;
    const role = useRole(user) ;
    if ( scopes.length ) {
        const perms = PERMISSIONS[role] ;
        const isGranted = hasPermission({perms, scopes}) ;
        if(!isGranted) {
            return <NotFound/> ;
        }
    }
    return (<> {children} </>) ;
}