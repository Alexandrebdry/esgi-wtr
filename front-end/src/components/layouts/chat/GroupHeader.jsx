import {Box, Grid, Typography} from "@mui/material";
import ChatIcon from "./ChatIcon";
import {color_red, color_red_hover, color_white} from "../../../services/colors";
import {Lock, LockOpen} from "@mui/icons-material";
import FormButton from "../button/FormButton";
import {useContext, useEffect, useState} from "react";
import {DialogContext} from "../../provider/DialogProvider";
import {addToGroupServices, getGroupsServices} from "../../../services/groupServices";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {GroupContext} from "../../provider/GroupProvider";
import {UserContext} from "../../provider/UserProvider";
import {sendAsk} from "../../../services/askServices";

export default function ({group}) {

    const {openSnackbar} = useContext(SnackbarContext) ;
    const {setIsGroupChanged} = useContext(GroupContext) ;
    const {user} = useContext(UserContext) ;
    const {setTitle, setContent, openDialog, closeDialog} = useContext(DialogContext) ;
    const [members, setMembers] = useState([]) ;

    useEffect(() => {
        getMembers() ;
    },[]);

    const getMembers = async () => {
        const response = await getGroupsServices('?groupId=' + group.id) ;
        setMembers(await response.json()['members']) ;
    }
    const askToJoin = async (group) => {
        try {
            if( group.maxUsers > members.length) {
                const res = await sendAsk(user.id, group.id) ;
                if(res.status < 300) {
                    openSnackbar('Votre demande à bien été envoyé') ;
                    closeDialog() ;
                }
            } else openSnackbar('Le groupe est complet','info');
        } catch(err) {openSnackbar("Votre demande n'a pas aboutie",'error'); console.error(err);}
    } ;
    const joinGroup = async ( group) => {
        try {
            if(group.maxUsers > members.length) {
                const res = await addToGroupServices(user.id, group);
                if (res.status < 300) {
                    openSnackbar('Vous avez rejoint le groupe');
                    setIsGroupChanged(true);
                    closeDialog() ;
                }
            } else openSnackbar('Le groupe est complet', 'info') ;

        } catch(err) {openSnackbar("Vous n'avez pas pu rejoindre le groupe...",'error')}
    } ;

    const validation = (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormButton clickHandler={()=> {
                    if(group.isPrivate){
                        askToJoin(group) ;
                    } else {
                        joinGroup(group) ;
                    }
                }} name={"oui"}/>
            </Grid>
            <Grid item xs={6}>
                <FormButton  clickHandler={()=> {closeDialog()}} name={"non"}/>
            </Grid>
        </Grid>
    );
    const dial = (isPrivate, isFull  = false) => {
        if(isFull) {
            setTitle('Le groupe est complete. Vous ne pouvez pas le rejoindre') ;
            setContent('') ;
        }
        else
            if (isPrivate) setTitle('Ce groupe est privé. Voulez-vous envoyez une demande ?')
            else setTitle('Voulez-vous rejoindre ce groupe ?')

        setContent(validation) ;
        openDialog() ;
    }

    return (
        <Box height={60} display={"flex"} alignItems={"center"} onClick={()=> {dial(group.isPrivate)}} justifyContent={"space-around"}
             color={color_white} sx={{bgcolor: color_red, '&:hover': {bgcolor: color_red_hover}, cursor:'pointer'}  } >
            <Box width={250} ml={3} display={"flex"} alignItems={"center"}>
                <ChatIcon groupID={group.id} ownerID={group.ownerID}/>
                <Typography ml={2} noWrap >{group.name}</Typography>
            </Box>

            <Box display={"flex"} justifySelf={"flex-end"}>
                <Typography mr={2}>{ members.length + '/' +  group.maxUsers}</Typography>
                {group.isPrivate ? <Lock  sx={{color: color_white}}/> : <LockOpen sx={{color: color_white}}/> }
            </Box>
        </Box>
    )
}