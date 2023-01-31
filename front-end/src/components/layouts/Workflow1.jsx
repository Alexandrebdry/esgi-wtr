import React, { useState, useContext, useEffect, useRef } from 'react';
import { color_white, color_red, color_red_hover } from '../../services/colors';
import FormButton from "../layouts/button/FormButton";
import {getCreneaux, patchCreneau} from "../../services/creneauServices";
import {UserContext} from "../provider/UserProvider";
import { Stack, Box, Typography, Button, FilledInput, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material";

export default function WorkFlow1() {
  const { user, setUserInformation} = useContext(UserContext) ;
  const [index, setIndex] = useState(1);
  const [carYear, setCarYear] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [radioChoice, setRadioChoice] = useState("yes");
  const [radioNo, setRadioNo] = useState("");
  const [confirmChoice, setConfirmChoice] = useState("");
  const [creneaux, setCreneaux] = useState([]);

  const current = new Date();
  let count = current - new Date(lastMaintenance);
  let numberDay = count / (1000 * 3600 * 24);

  const sendFormOne = (index) => {
    setIndex(index);
    console.log(index);
  }

  const getCreneau = async() => {
    try {
      if(user) {
        const response = await getCreneaux();
        const data = await response.json();
        console.log(data);
        setIndex(4);
        setCreneaux(data);
      }
    } catch (err) {console.error(err);}
  }

  const SendFormTwo = async(index) => {
    setIndex(index);
      const response = await getCreneaux();
      const data = await response.json();
      setCreneaux(data);
  }

  const onOptionChange = e => {
    setRadioChoice(e.target.value)
  }

  const SendFormThree = async(index) => {
    console.log(radioChoice);
    if (radioChoice === 'no') {
      setRadioNo("Vous ne souhaitez pas faire vérifier votre véhicule.");
    }
    else {
      setIndex(index);
      const response = await getCreneaux();
      const data = await response.json();
      console.log(data);
      setCreneaux(data);
    }
  }

  const chooseTime = (creneaux) => {
    setIndex(5);
    setCreneaux(creneaux);
  }

  const confirmCreneau = async(creneau) => {
    const responsePatch = await patchCreneau(creneau, user);
    const dataPatch = await responsePatch.json();
    setConfirmChoice('Votre rendez-vous est confirmé !');
  }

  const template1 = () => {
    return (
      <>
        <TextField type="text" name="dateVehicule" variant="standard" label="Année du véhicule" value={carYear} onChange={event => setCarYear(event.target.value)} style={{margin: '0.5vh'}} />
        <TextField type="date" name="dateMaintenance" variant="standard" label="Date du dernier entretien" value={lastMaintenance} onChange={event => setLastMaintenance(event.target.value)} style={{margin: '0.5vh'}}/>
        <Button
          onClick={(event) => 
            sendFormOne(2)
          }
          variant="contained"
          fullWidth
          sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
          type="submit"
        >
          Chercher
        </Button>
      </>
    )
  }

  const template2 = () => {
    if (numberDay < 365) {
      return (
        <>
          <p>{`Kilomètres parcourus depuis le ${lastMaintenance}`}</p>
          <TextField type="number" name="kilometer" variant="standard" label='Kilomètres' value={kilometer} onChange={event => setKilometer(event.target.value)}/>
          <Button
            onClick={(event) => 
              SendFormTwo(3)
            }
            variant="contained"
            fullWidth
            sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
            type="submit"
          >
            Envoyer
          </Button>
        </>
      )
    }
    else {
      return (
        <>
          <p>{`Oulala votre véhicule à été révisé le ${lastMaintenance}, il est temps de le contrôler`}</p>
          <Button
            onClick={(event) =>
              getCreneau()
            }
            variant="contained"
            fullWidth
            sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
            type="submit" 
          >
            Choisir un créneau
        </Button>
        </>
      )
    }
  }

  const template3 = () => {
    return (
      <>
        <p>Souhaitez vous faire reviser votre véhicule ?</p>
        <RadioGroup
          row
          sx={{justifyContent: 'center'}}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="yes" control={<Radio />} label="Oui" checked={radioChoice === "yes"} onChange={onOptionChange} />
          <FormControlLabel value="no" control={<Radio />} label="Non" checked={radioChoice === "no"} onChange={onOptionChange} />
        </RadioGroup>
        <Button
          onClick={(event) => 
            SendFormThree(4)
          }
          variant="contained"
          fullWidth
          sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
          type="submit" 
        >
          Envoyer
        </Button>
        <p>{radioNo}</p>
      </>
    )
  }

  const template4 = () => {
    return (
      <>
        {creneaux.map((creneau, i) =>
          <Button
            key={i}
            variant="contained"
            fullWidth
            sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
            value={creneau}
            onClick={(event) =>
              chooseTime(creneau)
            }
          >
            {creneau.date} à {creneau.hour}
          </Button>
        )}
      </>
    )
  }

  const template5 = () => {
    return (
      <>
        <p>{`Rendez-vous le ${creneaux.date} à ${creneaux.hour}`}</p>
        <p>Souhaitez vous le réserver ?</p>
        <Button
          variant="contained"
          fullWidth
          sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
          onClick={(event) =>
            confirmCreneau(creneaux.id)
          }
        >
          Confirmer
        </Button>
        {confirmChoice}
      </>
    )
  }

  return (
    <>
      <Typography sx={{textAlign: 'center', fontSize: '18px'}}>Entretien de votre véhicule</Typography>
      <Stack display={'flex'} justifyContent={'space-around'} >
        { index === 1 && template1() }
        { index === 2 && template2() }
        { index === 3 && kilometer < 10000 && template3() }
        { index === 3 && kilometer >= 10000 && template4() }
        { index === 4 && template4() }
        { index === 5 && template5() }
      </Stack>
    </>
  )
}
