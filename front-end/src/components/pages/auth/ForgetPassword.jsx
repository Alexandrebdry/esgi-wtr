import useScrollNavigate from "../../hooks/useScrollNavigate";
import {useContext, useState} from "react";
import {askResetPassword} from "../../../services/authServices";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {Avatar, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";

export default function () {

    const [email, setEmail] = useState('');
    const scrollNavigate = useScrollNavigate() ;
    const {openSnackbar} = useContext(SnackbarContext) ;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(!email) {
                openSnackbar('Aucun email saisie', 'warning');
                return
            }

            const res = await askResetPassword(email) ;
            if(res.status === 204) openSnackbar("Une demande de changement de mot de passe vient d'etre envoyer",'success') ;

        } catch (e) {
            openSnackbar('email non valide','error') ;
        }
    }

    return (
        <Box width={'100'} marginTop={8} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
            <Avatar sx={{width:50, height:50, bgcolor: 'red'}} >
                <Login fontSize={"large"}/>
            </Avatar>
            <Typography component={"h1"} variant={"h4"}>Mot de passe oublié</Typography>
            <Box component={"form"} noValidate onSubmit={handleSubmit} marginTop={3}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <TextField fullWidth required id={"email"} label={"Adresse email"} name={"email"} autoComplete={"email"} value={email} onChange={(evt) => {setEmail(evt.target.value)}} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button sx={{bgcolor: "red"}} type={"submit"} fullWidth variant={"contained"} >envoyer une demande</Button>
                    </Grid>
                </Grid>

                <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
                    <Link underline={"none"} onClick={() => scrollNavigate('/register')} sx={{cursor:'pointer'}} marginRight={2}  variant={"body2"}>Vous n'avez pas de compte ? Inscrivez-vous</Link>
                    <Link underline={"none"} onClick={() => scrollNavigate('/login')} sx={{cursor:'pointer'}} variant={"body2"}>Se connecter</Link>
                </Box>
            </Box>
        </Box>
    )
}