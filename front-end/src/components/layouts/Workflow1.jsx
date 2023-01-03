import React, { useState, useRef } from 'react';
import { Stack, Box, Button, FilledInput, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material";

export default function WorkFlow1() {
  // const [firstWorkflow, setFirstWorflow] = useState(["Année du véhicule", "Date du dernier entretien"]);
  const [carYear, setCarYear] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [replace, setReplace] = useState(false);
  const [replace2, setReplace2] = useState(false);
  const [radioChoice, setRadioChoice] = useState("yes");
  const [radioNo, setRadioNo] = useState("");
  //index et créer des functions pour chaque return , index à 0

  const current = new Date();
  // const currentDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  // console.log(typeof(current.toLocaleDateString('fr')));

  const sendFormOne = (event) => {
    // let test = new Date(lastMaintenance);
    // console.log(firstWorkflow);
    // let test = parseInt(lastMaintenance, 10);
    // setLastMaintenance(new Date("yyyy-MM-dd"));
    // console.log(lastMaintenance.getTime());
    // console.log(lastMaintenance + ' : ' + currentDate);
    // console.log('currentDate :' , Date(currentDate));
    // console.log('lastMaintenance :' , Date(lastMaintenance));
    let count = current - new Date(lastMaintenance);
    let numberDay = count / (1000 * 3600 * 24);
    // console.log(Math.round(test1));
    // console.log("Total number of days between dates  <br>"
    //            + new Date(lastMaintenance) + "<br> and <br>" 
    //            + current + " is: <br> " 
    //            + test1);

    if(numberDay > 365) {
      console.log("Le dernier entretien est supérieur à un an");
    }
    else {
      setReplace(true);
      console.log("Le dernier entretien est inférieur à un an");

    }
  }
  let textfieldOne;
  let textfieldTwo;
  let buttonForm;
  let hola;

  const SendFormTwo = (event) => {
    console.log(kilometer);
    if (kilometer >= 10000) {
      console.log("c'est supérieur à 10000");
    }
    else {
      setReplace2(true);
      console.log("C'est inférieur à 10000");
    }
  }

  const onOptionChange = e => {
    setRadioChoice(e.target.value)
  }

  const SendFormThree = (event) => {
    console.log(radioChoice);
    if (radioChoice === 'no') {
      setRadioNo("Vous ne souhaitez pas faire vérifier votre véhicule");
    }
  }

  if(replace === false) {
    textfieldOne = <TextField type="text" name="dateVehicule" variant="standard" label="Année du véhicule" value={carYear} onChange={event => setCarYear(event.target.value)} style={{margin: '0.5vh'}} />
    textfieldTwo = <TextField type="date" name="dateMaintenance" variant="standard" label="Date du dernier entretien" value={lastMaintenance} onChange={event => setLastMaintenance(event.target.value)} style={{margin: '0.5vh'}}/>
    buttonForm = <Button
                    onClick={(event) => 
                      sendFormOne()
                    }
                    sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, marginTop: 5,
                    '&:hover': {backgroundColor: '#EDECED'}}}
                    type="submit"
                  >
                    Chercher
                  </Button>
  }
  else if (replace2 === true) {
    textfieldOne = <p>Souhaitez vous faire reviser votre véhicule ?</p>
    textfieldTwo = <RadioGroup
                    row
                    sx={{justifyContent: 'center'}}
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="yes"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Oui" checked={radioChoice === "yes"} onChange={onOptionChange} />
                    <FormControlLabel value="no" control={<Radio />} label="Non" checked={radioChoice === "no"} onChange={onOptionChange} />
                  </RadioGroup>
    buttonForm = <Button
                  onClick={(event) => 
                    SendFormThree()
                  }
                  sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, marginTop: 5,
                  '&:hover': {backgroundColor: '#EDECED'}}}
                  type="submit" 
                >
                  Envoyer
                </Button>
    hola =  <p>{radioNo}</p>
  }
  else {
    textfieldOne = <><p>{`Kilomètres parcourus depuis le ${lastMaintenance}`}</p><TextField type="number" name="kilometer" variant="standard" label='Kilomètres' value={kilometer} onChange={event => setKilometer(event.target.value)}/></>
    buttonForm = <Button
                  onClick={(event) => 
                    SendFormTwo()
                  }
                  sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, marginTop: 5,
                  '&:hover': {backgroundColor: '#EDECED'}}}
                  type="submit"
                >
                  Envoyer
                </Button>
  }

  // const handleChange = (event) => {
  //   console.log(event);
  // }

  return (
    <>
    {/* <Stack display={'flex'} justifyContent={'space-around'}>
      {firstWorkflow.map((test, index) =>
        <TextField
          key={index}
          type="date"
          name="date"
          label={test}
          style={{margin: '0.5vh'}}
          onChange={event => setFirstWorflow(event.target.value)}
        />
      )}
      <Button
          onClick={(event) => 
            sendForm()
          }
          sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, marginTop: 5,
          '&:hover': {backgroundColor: '#EDECED'}}}
          type="submit"
        >
          Chercher
        </Button>
    </Stack> */}

      <Stack display={'flex'} justifyContent={'space-around'} >
        {/* <TextField type="text" name="date" variant="standard" label="Année du véhicule" value={carYear} onChange={event => setCarYear(event.target.value)} style={{margin: '0.5vh'}} />
        <TextField type="date" name="date" variant="standard" label="Date du dernier entretien" value={lastMaintenance} onChange={event => setLastMaintenance(event.target.value)} style={{margin: '0.5vh'}}/>
         */}
         {textfieldOne}
         {textfieldTwo}
         {buttonForm}
         {hola}
        {/* <Button
          onClick={(event) => 
            sendForm()
          }
          sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, marginTop: 5,
          '&:hover': {backgroundColor: '#EDECED'}}}
          type="submit"
        >
          Chercher
        </Button> */}
      </Stack>
    </>
  )
}
