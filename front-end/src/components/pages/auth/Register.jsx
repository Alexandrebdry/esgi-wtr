import {useContext, useState} from "react";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import useScrollNavigate from "../../hooks/useScrollNavigate";
import {registerService} from "../../../services/authServices";
import {Avatar, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Person} from "@mui/icons-material";

export default function Register () {

    const {openSnackbar} = useContext(SnackbarContext) ;
    const [firstname, setFirstname] = useState('') ;
    const [lastname, setLastname] = useState('') ;
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [passwordConfirm, setPasswordConfirm] = useState('') ;
    const scrollNavigate = useScrollNavigate() ;

    const handleSubmit = (event) => {
        event.preventDefault() ;
        if (!firstname || !lastname || !email || !password || !passwordConfirm) {
            openSnackbar("Veuillez remplir tous les champs", "error") ;
            return ;
        }
        if (password !== passwordConfirm) {
            openSnackbar("Les mots de passe ne correspondent pas", "error") ;
            return ;
        }
        const user = {
            "email": email,
            "password": password,
            "firstName": firstname,
            "lastName": lastname
        };

        registerService(user).then(data => data.json()).then((data) => {
            setEmail('') ;
            setPassword('') ;
            setPasswordConfirm('') ;
            setFirstname('') ;
            setLastname('') ;
           openSnackbar("Votre compte a bien été créé, un mail de vérification a été envoyé", "success") ;
        }).catch((err) => {
            openSnackbar("Une erreur est survenu lors de la tentative de création de compte, veuillez réessayer", "error") ;
        });
    }

    return (
        <Box  mt={8} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Avatar sx={{width:50, height:50, bgcolor: 'red'}} >
                <Person fontSize={"large"}/>
            </Avatar>
            <Typography component={"h1"} variant={"h4"}>S'inscrire</Typography>
            <Box width={'50%'} component={"form"} noValidate onSubmit={handleSubmit} marginTop={3}>
                <Grid container  spacing={1} >
                    <Grid item xs={12}>
                        <TextField required fullWidth autoFocus  autoComplete={"given-name"} name={"firstname"} onChange={(evt)=>{setFirstname(evt.target.value)}} id={"firstname"} value={firstname} label={"Prénom"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"family-name"} name={"lastname"} onChange={(evt)=>{setLastname(evt.target.value)}} id={"lastname"} value={lastname} label={"Nom"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"email"} name={"email"} onChange={(evt)=>{setEmail(evt.target.value)}} id={"email"} value={email} label={"Email"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"new-password"} name={"password"} onChange={(evt)=>{setPassword(evt.target.value)}} id={"password"} value={password} label={"Mot de passe"} type={"password"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required fullWidth autoComplete={"new-password"} name={"passwordConfirm"} onChange={(evt)=>{setPasswordConfirm(evt.target.value)}} id={"passwordConfirm"} value={passwordConfirm} label={"Confirmer le mot de passe"} type={"password"}  />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{bgcolor: "red"}} type={"submit"} fullWidth variant={"contained"} >s'inscrire</Button>
                    </Grid>
                </Grid>
                <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
                    <Link underline={"none"} onClick={() => scrollNavigate('/login')} sx={{cursor:'pointer'}}  variant={"body2"} > Déjà un compte? Se connecter</Link>
                </Box>
            </Box>

        </Box>
    )


}