import React, { useState, useContext } from 'react';
import { color_red, color_red_hover } from '../../../services/colors';
import {UserContext} from "../../provider/UserProvider";
import {getCreneauIs, patchCreneau} from "../../../services/creneauServices";
import { Stack, Button, Typography } from '@mui/material';

const WorkFlow2 = () => {
  const [usage, setUsage] = useState(["Usage routier", "Usage tout-terrain", "Usage sportif"]);
  const [index, setIndex] = useState(0);
  const { user, setUserInformation} = useContext(UserContext) ;
  const [creneauIs, setCreneauIs] = useState([]);
  const [confirmChoice, setConfirmChoice] = useState("");

  const choiceUsage = async(index) => {

    setIndex(index);
    if(index === 1) {
      const response = await getCreneauIs('/isDriver?');
      const data = await response.json();
      setCreneauIs(data);
    }
    else if(index === 2) {
      const response = await getCreneauIs('/isOffRoad?');
      const data = await response.json();
      setCreneauIs(data);
    }
    else if (index === 3) {
      const response = await getCreneauIs('/isSportDriver?');
      const data = await response.json();
      setCreneauIs(data);
    }
  }

  const chooseTimeDriver = (creneauDrive) => {
    setIndex(5);

    setCreneauIs(creneauDrive)
  }

  const confirmCreneauReservation = async(creneau) => {
    const responsePatch = await patchCreneau(creneau, user);
    const dataPatch = await responsePatch.json();

    setConfirmChoice('Votre rendez-vous est confirmé !');
  }

  const templateIs = () => {
    return (
      <>
        {creneauIs.map((creneauDriver, i) =>
          <Button
            key={i}
            variant="contained"
            fullWidth
            sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
            value={creneauDriver}
            onClick={(event) =>
              chooseTimeDriver(creneauDriver)
            }
          >
            {creneauDriver.date} à {creneauDriver.hour}
          </Button>
        )}
      </>
    )
  }

  const templateConfirmReservation = () => {
    return (
      <>
        <p>{`Rendez-vous le ${creneauIs.date} à ${creneauIs.hour} pour un essai`}</p>
        <p>Souhaitez vous le réserver ?</p>
        <Button
          variant="contained"
          fullWidth
          sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
          onClick={(event) =>
            confirmCreneauReservation(creneauIs.id)
          }
        >
          Confirmer
        </Button>
        {confirmChoice}
      </>
    )
  }

  const allTypeUsage = () => {
    return (
      <>
        {usage.map((usage, index) => 
          <Button
            key={index}
            fullWidth
            variant="contained"
            sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
            value={usage}
            style={{margin:'10px'}}
            onClick={(event) => 
              choiceUsage(index+1)
            }
          >
            {usage}
          </Button>
        )}
      </>
    )
  }

  return (
    <>
      <Stack>
      <Typography sx={{textAlign: 'center', fontSize: '18px'}}>Informations sur les véhicules</Typography>
        { index === 0 && allTypeUsage() }
        { index === 1 && templateIs() }
        { index === 2 && templateIs() }
        { index === 3 && templateIs() }
        { index === 5 && templateConfirmReservation() }
      </Stack>
    </>
  )
}

export default WorkFlow2;