import React, { useState } from 'react';
import { Stack, Button} from '@mui/material';
import { color_red } from '../../services/colors';

const WorkFlow3 = () => {
  const [contact, setContact] = useState(['Adresse mail', 'Numéro de téléphone'])
  const [indexContact, setIndexContact] = useState(0);

  const choiceContact = (index) => {
    setIndexContact(index);
  }

  return (
    <Stack>
      {contact.map((contact, index) =>
        <Button
          key={index}
          className="bot_message"
          variant="contained"
          sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, 
          '&:hover': {backgroundColor: '#EDECED'}}}
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