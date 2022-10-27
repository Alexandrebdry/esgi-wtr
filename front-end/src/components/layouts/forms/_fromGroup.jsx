import {Box, Checkbox, FormControlLabel, Grid, Slider, TextField, Typography} from "@mui/material";
import FormButton from "../button/FormButton";
import {useContext, useState} from "react";
import {color_red} from "../../../services/colors";
import {SnackbarContext} from "../../provider/SnackbarProvider";
import {patchGroup} from "../../../services/groupServices";
import {GroupContext} from "../../provider/GroupProvider";

export default function  ({group, submitMethod}) {

    const [name, setName] = useState(group.name) ;
    const [description, setDescription] = useState(group?.description) ;
    const [max, setMax] = useState(group.maxUsers) ;
    const [isPrivate, setIsPrivate] = useState(group.isPrivate) ;

    const {openSnackbar} = useContext(SnackbarContext) ;
    const {setIsGroupChanged} = useContext(GroupContext) ;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await patchGroup({id: group.id,name,description,maxUsers : max,isPrivate}) ;
            if(res.status < 400) {
                openSnackbar('Le groupe a bien été modifié') ;
                setIsGroupChanged(true) ;
                submitMethod() ;
            }
            else throw new Error() ;
        } catch (err) {}
    }

    return(
        <Box component={"form"} noValidate onSubmit={handleSubmit} marginTop={3}>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <TextField fullWidth label={"Nom du groupe"} value={name} onChange={(evt)=> {setName(evt.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label={"description"} value={description ? description : ''} onChange={(evt)=> {setDescription(evt.target.value)}} />
                </Grid>
                <Grid item xs={12}>
                    <Typography id="input-slider" gutterBottom>
                        Max utilisateurs
                    </Typography>
                    <Slider onChange={(evt) => {setMax(evt.target.value)}} defaultValue={group.maxUsers} sx={{color:color_red}} aria-label="Default" valueLabelDisplay="auto" min={4} max={50} />
                </Grid>
                <Grid item xs={12} mb={2}>
                    <FormControlLabel label="groupe privé" control={
                        <Checkbox defaultChecked={group.isPrivate} onChange={(evt)=>{setIsPrivate(evt.target.checked)}} sx={{color: color_red+'!important'}}   />
                    } />
                </Grid>
                <Grid item xs={12}>
                    <FormButton name={"Sauvegarder"}/>
                </Grid>
            </Grid>

        </Box>
    );
}