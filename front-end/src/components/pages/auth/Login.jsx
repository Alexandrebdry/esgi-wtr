import {useContext, useState} from "react";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {Avatar, Box, Button, Grid, Link, Stack, TextField, Typography} from "@mui/material";
import {Login} from "@mui/icons-material";
import useScrollNavigate from "../../hooks/useScrollNavigate";
import {loginService} from "../../../services/authServices";
import {UserContext} from "../../provider/UserProvider";


export default function () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {openSnackbar} = useContext(SnackbarContext) ;
    const {setUserInformation} = useContext(UserContext) ;
    const scrollNavigate = useScrollNavigate() ;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email|| !password) {
            openSnackbar("Veuillez remplir tous les champs", "error") ;
            return ;
        }
        const user = {
            email: email,
            password: password
        } ;

        loginService(user).then((data) => {
            setUserInformation(data) ;
            scrollNavigate("/") ;
        }).catch((err) => {
            openSnackbar("Une erreur est survenu lors de la tentative de connexion, veuillez réessayer", "error") ;
        }) ;

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }

    return (
        <Box width={'100'} marginTop={8} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
            <Avatar sx={{width:50, height:50, bgcolor: 'red'}} >
                <Login fontSize={"large"}/>
            </Avatar>
            <Typography component={"h1"} variant={"h4"}>Se connecter</Typography>
            <Box component={"form"} noValidate onSubmit={handleSubmit} marginTop={3}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <TextField fullWidth required id={"email"} label={"Adresse email"} name={"email"} autoComplete={"email"} value={email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth required id={"password"} label={"mot de passe"} name={"password"} autoComplete={"password"} value={password} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{bgcolor: "red"}} type={"submit"} fullWidth variant={"contained"} >se connecter</Button>
                    </Grid>
                </Grid>

                <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
                    <Link underline={"none"} onClick={() => scrollNavigate('/register')} sx={{cursor:'pointer'}} marginRight={2}  variant={"body2"}>Vous n'avez pas de compte ? Inscrivez-vous</Link>
                    <Link underline={"none"} onClick={() => scrollNavigate('/forget-password')} sx={{cursor:'pointer'}} variant={"body2"}>Mot de passe oublié ?</Link>
                </Box>
            </Box>
        </Box>
    )
}