import {Box, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {color_green, color_red} from "../../../../services/colors";
import {Close, Done, Group} from "@mui/icons-material";
import {addToGroup, addToGroupServices, getGroup, getGroupsServices} from "../../../../services/groupServices";
import {useContext, useEffect, useState} from "react";
import {SnackbarContext} from "../../../provider/SnackbarProvider";
import {DialogContext} from "../../../provider/DialogProvider";
import {deleteAsk} from "../../../../services/askServices";
import {GroupContext} from "../../../provider/GroupProvider";

export default function ({list}) {

    const {openSnackbar} = useContext(SnackbarContext) ;
    const {closeDialog} = useContext(DialogContext) ;
    const {setIsGroupChanged} = useContext(GroupContext) ;
    const [members,setMembers] = useState(0) ;
    useEffect(() => {
        getMembers() ;
    },[]);

    const getMembers = async () => {
        const response = await getGroupsServices('?groupId=' +list.groupID) ;
        setMembers(await response.json()) ;
    }
    const getGroupToJoin = async () => {
        try {
            const res = await getGroup(list.groupID) ;
            return res ;
        } catch(err) {console.error(err);}
    }

    const joinGroup = async () => {
        try {
            const group = await getGroupToJoin() ;
            if(group.maxUsers > members.length) {
                const res = await addToGroupServices(list.userID, group) ;
                if(res.status <300) {
                    await deleteAsk(list.id) ;
                    openSnackbar(`${list.user_id.firstName} a été ajouté au groupe`) ;
                } else throw new Error() ;
            } else openSnackbar('Le groupe est complet') ;
            setIsGroupChanged(true) ;
            closeDialog() ;
        } catch (err) {openSnackbar('Impossible de rejoindre le groupe',"error"); console.log(err)}
    } ;

    const delAsk = async () => {
        try {
            const res = await deleteAsk(list.id) ;
            if(res.status < 300) {
                openSnackbar('La demande a bien été refusé') ;
                setIsGroupChanged(true) ;
                closeDialog() ;
            }
        } catch (err) { }
    } ;

    return(
        <ListItemButton>
            <ListItemText sx={{mr:10}} primary={"Demande de "} secondary={list.user_id.firstName+ ' ' + list.user_id.lastName}/>
            <Box>
                <ListItemIcon>
                    <IconButton onClick={() => {joinGroup()}}>
                        <Done sx={{color: color_green}}/>
                    </IconButton>
                </ListItemIcon>
                <ListItemIcon>
                    <IconButton onClick={() => {delAsk()}}>
                        <Close sx={{color: color_red}}/>
                    </IconButton>
                </ListItemIcon>
            </Box>
        </ListItemButton>
    )

 }