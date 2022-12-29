import {Fab, Grid, IconButton, TextField, Typography} from "@mui/material";
import {Clear, Edit, Send} from "@mui/icons-material";
import {color_red, color_white} from "@/services/colors";

export function EditSender ({editFunction, cancelFunction, messageRef}) {

    return (
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11} style={{display: "flex" , flexDirection: "row" , alignItems: "center"}}>
                <TextField  ref={messageRef} id="outlined-basic-email" label="Type Something" fullWidth />
                <IconButton onClick={() => cancelFunction()}>
                    <Clear color={"warning"} />
                </IconButton>
            </Grid>
            <Grid xs={1} item  align="center">
                <Fab onClick={() => editFunction()} style={{background: color_red, color: color_white}}  aria-label="add"><Edit/></Fab>
            </Grid>
        </Grid>
    )

}

export function Sender ({messageRef, sendMessage}) {


    return (
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <TextField ref={messageRef} id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid xs={1} item align="center">
                <Fab onClick={() => sendMessage()} style={{background: color_red, color: color_white}}  aria-label="add"><Send /></Fab>
            </Grid>
        </Grid>
    )
}

export function NotAllowedSender () {

    return (
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={12}>
                <Typography>Vous ne faites plus parti du groupe</Typography>
            </Grid>
        </Grid>
    )

}