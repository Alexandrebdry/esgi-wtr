import {useContext, useEffect, useState} from "react";
import {UserContext} from "../provider/UserProvider";
import useScrollNavigate from "../hooks/useScrollNavigate";
import {Box, Stack, Typography} from "@mui/material";

import {text_color, color_white} from "../../services/colors";
import FormButton from "../layouts/button/FormButton";
import Chat from "../layouts/Chat";


export default function ({}) {

    const {user} = useContext(UserContext) ;
    const scrollNavigate = useScrollNavigate() ;
    const [loader, setLoader] = useState(true) ;

    useEffect(() => {
       if (user) setLoader(false) ;

    },[user]) ;

    return (
        !loader &&
            <Box>
                <div style={{
                    height:'100vh', backgroundImage: "url('images/hero-banner.jpg')",
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover' ,
                }}>
                    <Box margin={'auto'} width={'100%'} height={'100%'} color={text_color} display={"flex"}  justifyContent={"flex-start"}>
                        <Stack marginLeft={{xs: 0 , md:10}} height={'100%'} color={text_color} display={"flex"} alignItems={{xs: 'center', sm:'flex-start'}} justifyContent={"center"}>
                            <Typography textAlign={"center"} fontWeight={"bolder"} variant={"h1"}> Site de moto </Typography>
                            <Typography alignSelf={{xs:'center', md:"flex-start"}}>Un site communautaire autour de la moto , venez discuter !</Typography>
                            <Box mt={4} mb={9}>
                                <FormButton clickHandler={() => {scrollNavigate('/groups')}} form={false} name={'Commencer à discuter'}/>
                            </Box>

                        </Stack>
                    </Box>
                </div>
                <Chat />
            </Box>
    );

}