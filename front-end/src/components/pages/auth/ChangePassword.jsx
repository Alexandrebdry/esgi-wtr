import {Avatar, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";
import {useContext, useState} from "react";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {confirmResetPassword} from "../../../services/authServices";
import {useParams} from "react-router-dom";
import useScrollNavigate from "../../hooks/useScrollNavigate";

export default function () {

    const [password, setPassword] = useState('') ;
    const [passwordConfirm, setPasswordConfirm] = useState('') ;
    const {openSnackbar} = useContext(SnackbarContext) ;
    const code = useParams().code ;
    const scrollNavigate = useScrollNavigate() ;


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== passwordConfirm) {
            openSnackbar("Les mots de passe doivent être identiques",'error') ;
            return
        }
        try {
            const res = await confirmResetPassword(password, code) ;
            if(res.status < 400)
                openSnackbar('le mot de passe a été changé') ;
            else throw new Error() ;
        } catch(err) {
            openSnackbar('token invalid','error') ;
        }

    }

    return (
        <Box width={'100'} marginTop={8} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
            <Avatar sx={{width:50, height:50, bgcolor: 'red'}} >
                <Login fontSize={"large"}/>
            </Avatar>
            <Typography component={"h1"} variant={"h4"}>Changement de mot de passe</Typography>
            <Box component={"form"} noValidate onSubmit={handleSubmit} marginTop={3}>
                <Grid container spacing={1} >

                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"new-password"} name={"password"} onChange={(evt)=>{setPassword(evt.target.value)}} id={"password"} value={password} label={"Mot de passe"} type={"password"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"new-password"} name={"passwordConfirm"} onChange={(evt)=>{setPasswordConfirm(evt.target.value)}} id={"passwordConfirm"} value={passwordConfirm} label={"Confirmer le mot de passe"} type={"password"}  />
                    </Grid>

                    <Grid item xs={12}>
                        <Button sx={{bgcolor: "red"}} type={"submit"} fullWidth variant={"contained"} >changer de mot de passe</Button>
                    </Grid>
                </Grid>
                <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
                    <Link underline={"none"} onClick={() => scrollNavigate('/login')} sx={{cursor:'pointer'}} variant={"body2"}>Se connecter</Link>
                </Box>

            </Box>
        </Box>
    )
}