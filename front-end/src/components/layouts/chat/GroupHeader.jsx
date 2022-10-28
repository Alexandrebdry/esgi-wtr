import {Avatar, Box, Grid, Typography} from "@mui/material";
import ChatIcon from "./ChatIcon";
import {color_green, color_red, color_red_hover, color_white} from "../../../services/colors";
import {Lock, LockOpen} from "@mui/icons-material";
import FormButton from "../button/FormButton";
import {useContext} from "react";
import {DialogContext} from "../../provider/DialogProvider";

export default function ({group}) {

    const {setTitle, setContent, openDialog, closeDialog} = useContext(DialogContext) ;
    const validation = (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <FormButton clickHandler={()=> {}} name={"oui"}/>
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
                <Typography mr={2}>{ group.members.length + '/' +  group.maxUsers}</Typography>
                {group.isPrivate ? <Lock  sx={{color: color_white}}/> : <LockOpen sx={{color: color_white}}/> }
            </Box>
        </Box>
    )
}