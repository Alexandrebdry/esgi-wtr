import {IconButton, ListItemButton, ListItemIcon, ListItemText, Snackbar} from "@mui/material";
import {Delete, DeleteForever, Lock, LockOpen, Settings} from "@mui/icons-material";
import {color_green, color_red} from "../../../../services/colors";
import {deleteGroup} from "../../../../services/groupServices";
import {useContext} from "react";
import {SnackbarContext} from "../../../provider/SnackbarProvider";

export default function ({group, del}) {

    const {openSnackbar} = useContext(SnackbarContext) ;

    const deleteMyGroup = async (group) => {
        try {
            const res = await deleteGroup(group.id) ;
            if(res.status === 204) {
                openSnackbar('Le groupe ' + group.name + ' a bien été supprimé','warning');
                del(true) ;
            }
            else throw new Error() ;
        } catch (err) {
            openSnackbar('Le groupe ' + group.name + ' na pas été supprimé','error') ;
        }
    }

    return (
        <ListItemButton divider  >
            <ListItemIcon> {group.isPrivate ? <Lock sx={{color: color_red}}/> : <LockOpen sx={{color: color_green}}/> } </ListItemIcon>
            <ListItemText primary={group.name}/>
            {group.description && <ListItemText primary={group.description} /> }
            <ListItemText primary={ group.members.length + '/' +  group.maxUsers}/>
            <ListItemText primary={ group.requests?.length ? 'demande en attente ' + group.requests.length : 'aucune demande' }/>
            <ListItemIcon> <IconButton> <Settings/> </IconButton> </ListItemIcon>
            <ListItemIcon> <IconButton onClick={() => {deleteMyGroup(group)}} > <DeleteForever sx={{color: color_red}}/> </IconButton> </ListItemIcon>
        </ListItemButton>
    )
}