import {Grid, IconButton, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {DeleteForever, Lock, LockOpen, Settings} from "@mui/icons-material";
import {color_green, color_red} from "../../../../services/colors";
import {addToGroup, deleteGroup} from "../../../../services/groupServices";
import {useContext} from "react";
import {SnackbarContext} from "../../../provider/SnackbarProvider";
import {DialogContext} from "../../../provider/DialogProvider";
import _fromGroup from "../../forms/_fromGroup";
import FormButton from "../../button/FormButton";
import {getAllAsksFromAGroup} from "../../../../services/askServices";
import {UserContext} from "../../../provider/UserProvider";
import AskList from "../asks/AskList";

export default function ({group, del}) {

    const {openSnackbar} = useContext(SnackbarContext) ;
    const {setTitle, setContent, openDialog, closeDialog} = useContext(DialogContext) ;
    const {user} = useContext(UserContext) ;
    const submitForm = () => {
        closeDialog();
    }
    const editGroup = () => {
        setTitle(`Edition de ${group.name}`) ;
        setContent(<_fromGroup group={group} submitMethod={submitForm}/>) ;
        openDialog() ;
    }

    const deleteMyGroup = async (group) => {
        try {
            const res = await deleteGroup(group.id) ;
            if(res.status === 204) {
                openSnackbar('Le groupe ' + group.name + ' a bien été supprimé','warning');
                del(true) ;
                closeDialog() ;
            }
            else throw new Error() ;
        } catch (err) {
            openSnackbar('Le groupe ' + group.name + ' na pas été supprimé','error') ;
        }
    }

    const validation = (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormButton clickHandler={()=> {deleteMyGroup(group)}} name={"oui"}/>
            </Grid>
            <Grid item xs={6}>
                <FormButton  clickHandler={()=> {closeDialog()}} name={"non"}/>
            </Grid>
        </Grid>
    );
    const confirmDelete = () => {
        setTitle(`Supprimer ${group.name} ?`) ;
        setContent(validation) ;
        openDialog() ;
    }

    const showList =  async () => {
        const asks = await getAskedList() ;
        setContent(
            asks.map((ask, key) => {
                return <AskList key={key} list={ask}/>
            })
        );
        setTitle('Liste des demandes') ;
        openDialog() ;
    }


    const getAskedList =  async () => {
        try {
            const res = await getAllAsksFromAGroup(group.id) ;
            if(res.status <300) {
                return await res.json() ;
            } else throw new Error() ;
        } catch(err) {console.error(err);}
    }

    return (
        <ListItemButton divider  >
            <ListItemIcon> {group.isPrivate ? <Lock sx={{color: color_red}}/> : <LockOpen sx={{color: color_green}}/> } </ListItemIcon>
            <ListItemText  sx={{width:{xs: '15%', sm:'10%'}}} primary={group.name} secondary={group.description? group.description : 'aucune description'}/>
            <ListItemText  sx={{width:'5%'}} primary={ group.members.length + '/' +  group.maxUsers}/>
            <ListItemText  sx={{width:'15%', display:{xs: 'none', sm:'block'}}} onClick={() => {showList()}} primary={ group.requests?.length ? 'demande en attente : ' + group.requests.length : 'aucune demande' }/>
            <ListItemIcon> <IconButton onClick={()=> {editGroup()}}> <Settings/> </IconButton> </ListItemIcon>
            <ListItemIcon> <IconButton onClick={() => {confirmDelete()}} > <DeleteForever sx={{color: color_red}}/> </IconButton> </ListItemIcon>
        </ListItemButton>
    )
}