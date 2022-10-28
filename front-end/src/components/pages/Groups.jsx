import {Box, Grid, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {text_color} from "../../services/colors";
import FormButton from "../layouts/button/FormButton";

export default function ({}) {

    const [loader, setLoader] = useState(false) ;

    return (
        !loader &&
        <Box mt={15}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant={"body1"} pl={5}> Liste des groupes </Typography>
                    <Grid container>

                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"} pl={5}> Personnes connectées </Typography>
                    <Grid container>

                    </Grid>
                </Grid>
            </Grid>

        </Box>
    );
}