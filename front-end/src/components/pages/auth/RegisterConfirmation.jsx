import {useEffect, useState} from "react";
import {verifyTokenService} from "../../../services/authServices";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material";

export default function RegisterConfirmation() {

    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const code = useParams().confirmation;

    useEffect(() => {
       const verifyToken = async () => {
              try {
                  const response = await verifyTokenService(code) ;
                  if(response.status === 204) setIsVerified(true) ;
              } catch (err) {console.warn(err)}

              setLoading(false) ;
       }
       verifyToken() ;
    }) ;

    return (
        <Box>
            { !loading &&
            isVerified ?
                <h1>Compte vérifié</h1> :
                <h1>Echec de lors de la vérification du compte. S'il est déjà vérifier n'en tenez pas compte</h1>
            }
        </Box>
    )

}