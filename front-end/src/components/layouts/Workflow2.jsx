import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';

const WorkFlow2 = () => {
  const [usage, setUsage] = useState(["Usage routier", "Usage tout-terrain", "Usage sportif"]);

  const choiceUsage = (index) => {
    console.log(index);
  }

  return (
    <Stack>
      {usage.map((usage, index) => 
        <Button
          key={index}
          className="bot_message"
          variant="contained"
          sx={{backgroundColor: '#EDECED', color: 'black', borderRadius: 10, 
          '&:hover': {backgroundColor: '#EDECED'}}}
          value={usage}
          style={{margin:'10px'}}
          onClick={(event) => 
            choiceUsage(index+1)
          }
        >
          {usage}
        </Button>
      )}
    </Stack>
  )
}

export default WorkFlow2;