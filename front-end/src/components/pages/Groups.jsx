import {Box, Container, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {getGroups} from "../../services/groupServices";
import GroupHeader from "../layouts/chat/GroupHeader";
import {GroupContext} from "../provider/GroupProvider";

export default function ({}) {

    const [loader, setLoader] = useState(true) ;
    const [groups, setGroups] = useState(null) ;
    const {isGroupChanged} = useContext(GroupContext) ;

    const getAllGroups = async () => {
       const res = await getGroups('') ;
       let group = [] ;
       if(res.status < 400) {
           group = await res.json() ;
           setGroups(group) ;
           setLoader(false) ;
       }


    } ;

    useEffect(() => {
        getAllGroups() ;
    },[isGroupChanged]) ;

    return (
        !loader &&
        <Box mt={15}>
            <Container maxWidth={"lg"}>
                <Grid container spacing={1} >
                    <Grid item sm={12} md={12}>
                        <Typography mb={2} variant={"h5"} pl={5}> Liste des groupes </Typography>
                        <Grid mb={5} ml={2} container spacing={1}>
                            {
                                groups && groups.map((group,key) => {
                                    return(
                                        <Grid item xs={11} lg={12} key={key}>
                                            <GroupHeader group={group} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}