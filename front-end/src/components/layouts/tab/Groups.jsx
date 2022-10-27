import {useContext, useEffect, useState} from "react";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {getGroups} from "../../../services/groupServices";
import GroupItem from "./item/GroupItem";
import {Typography} from "@mui/material";
import {GroupContext} from "../../provider/GroupProvider";

export default function ({user}) {

    const [loading, setLoading] = useState(true) ;
    const {openSnackbar} = useContext(SnackbarContext) ;
    const {groups, setGroups, isGroupChanged, setIsGroupChanged} = useContext(GroupContext) ;

    const getMyGroups = async () => {
        try {
            const res = await getGroups("ownerID="+ user.id) ;
            setGroups(await res.json()) ;
            if(isGroupChanged) setIsGroupChanged(false) ;
        } catch(err) {openSnackbar(err.message,"error")}
    } ;

    useEffect(() => {
        if(loading) getMyGroups() ;
        if(isGroupChanged) getMyGroups() ;
        setLoading(false) ;
    },[loading, isGroupChanged]) ;

    return (
        !loading && groups?.length > 0 ?
            groups.map((group,key) => {
                return (
                    <div  key={key}>
                        <GroupItem del={setIsGroupChanged} group={group}/>
                    </div>
                )
            }) :
            <Typography>Aucun groupe créé</Typography>
    );
}