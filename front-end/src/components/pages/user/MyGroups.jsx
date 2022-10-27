import {Box, Grid, ListItem, ListItemText, Tabs, Typography} from "@mui/material";
import {useContext} from "react";
import {UserContext} from "../../provider/UserProvider";
import Groups from "../../layouts/tab/Groups";

export default function () {

    const {user} = useContext(UserContext) ;

    return (
        user &&
        <Box mt={15} >
            <Typography textAlign={"center"} variant={"h3"} mb={7} >Gérer mes groupes</Typography>
            <Grid container >

                <Grid item margin={'auto'} xs={11}>
                    <Groups user={user}/>
                </Grid>
            </Grid>
        </Box>
    )
}