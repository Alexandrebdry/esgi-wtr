import React, { useState } from 'react';
import { Stack, Button, Typography} from '@mui/material';
import { color_white, color_red, color_red_hover } from '../../services/colors';

const WorkFlow3 = () => {
  const [contact, setContact] = useState(['Adresse mail', 'Numéro de téléphone'])
  const [indexContact, setIndexContact] = useState(0);

  const choiceContact = (index) => {
    setIndexContact(index);
  }

  return (
    <Stack>
      <Typography sx={{textAlign: 'center', fontSize: '18px'}}>Contact</Typography>
      {contact.map((contact, index) =>
        <Button
          key={index}
          variant="contained"
          fullWidth
          sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
          value={contact}
          style={{margin:'10px'}}
          onClick={(event) =>
            choiceContact(index+1)
          }
        >
          {contact}
        </Button>
      )}
      <p style={{textAlign: 'center', fontSize: 20, color: color_red, fontWeight: 900}}>
        { indexContact === 1 && 'myges@gmail.com'}
        { indexContact === 2 && '0123456789'}
      </p>
    </Stack>
  )
}

export default WorkFlow3;