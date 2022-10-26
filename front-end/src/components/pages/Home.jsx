import {useContext, useEffect, useState} from "react";
import {UserContext} from "../provider/UserProvider";
import useScrollNavigate from "../hooks/useScrollNavigate";
import {Box, Stack, Typography} from "@mui/material";
import {color_white} from "../../services/colors";
import {createGroup} from "../../services/groupServices";

export default function ({}) {

    const {user} = useContext(UserContext) ;
    const scrollNavigate = useScrollNavigate() ;
    const [loader, setLoader] = useState(true) ;

    useEffect(() => {
       if (user) setLoader(false) ;
       console.log(user) ;
    },[user]) ;

    return (
        !loader &&
            <Box>
                <div style={{
                    height:'100vh', backgroundImage: "url('images/hero-banner.jpg')",
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                }}>
                    <Box margin={'auto'} width={'100%'} height={'100%'} color={color_white} display={"flex"}  justifyContent={"flex-end"}>
                        <Stack marginRight={{xs: 0 , md:40}} height={'100%'} color={color_white} display={"flex"} alignItems={{xs: 'center', sm:'flex-start'}} justifyContent={"center"}>
                            <Typography textAlign={"center"} fontWeight={"bolder"} variant={"h1"}> Site de moto </Typography>
                            <Typography alignSelf={{xs:'center', sm:'flex-end'}}>un site de moto pas comme les autres</Typography>
                        </Stack>
                    </Box>

                </div>
            </Box>
    );

}