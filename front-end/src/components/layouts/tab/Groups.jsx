import {useContext, useEffect, useState} from "react";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {getGroups} from "../../../services/groupServices";
import GroupItem from "./item/GroupItem";
import {Typography} from "@mui/material";

export default function ({user}) {

    const [groups, setGroups] = useState(null) ;
    const [isDeleted, setIsDeleted] = useState(false) ;
    const [loading, setLoading] = useState(true) ;
    const {openSnackbar} = useContext(SnackbarContext) ;

    const getMyGroups = async () => {
        try {
            const res = await getGroups("ownerID="+ user.id) ;
            setGroups(await res.json()) ;
            if(isDeleted) setIsDeleted(false) ;
        } catch(err) {openSnackbar(err.message,"error")}
    } ;

    useEffect(() => {
        if(loading) getMyGroups() ;
        if(isDeleted) getMyGroups() ;
        setLoading(false) ;
    },[loading, isDeleted]) ;

    return (
        !loading && groups?.length > 0 ?
            groups.map((group,key) => {
                return (
                    <div  key={key}>
                        <GroupItem del={setIsDeleted} group={group}/>
                    </div>
                )
            }) :
            <Typography>Aucun groupe créé</Typography>
    );
}