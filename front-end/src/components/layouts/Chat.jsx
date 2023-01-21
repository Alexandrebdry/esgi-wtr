import React, { useState } from 'react';
import { color_white, color_red, color_red_hover } from '../../services/colors';
import { QuestionAnswer, Cancel, Home } from '@mui/icons-material';
import "../../styles/chatbox.css";
import chatbotImage from "../../../public/images/bot_image.jpg";
import WorkFlow1 from './Workflow1.jsx';
import WorkFlow2 from './Workflow2.jsx';
import WorkFlow3 from './Workflow3.jsx';
import WorkFlow4 from './Workflow4.jsx';
import { Box, Typography, Button, Avatar, IconButton, Stack } from "@mui/material";

const Chat = () => {
  const [select, setSelect] = useState(["Entretien de votre véhicule", "Informations sur les véhicules", "Nous contacter", "Finalement je ne veux rien"]);
  const [index, setIndex] = useState(0);
  const [show, setShown] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const handleClick = (index) => {
    setIndex(index);
    setIsStart(true);
  }

  const openChat = event => {
    setShown(current => !current);
  }
  
  const closeChat = () => {
    setShown(false);
    setIndex(0);
    setIsStart(false);
  }

  const resetIndex = () => {
    setIndex(0);
    setIsStart(false);
  }

  return (
    <Box display='flex' alignItems='flex-end' justifyContent='flex-start' sx={{position: 'absolute', bottom: 20, left: 20}} height={'100%'}>
      <Avatar sx={{backgroundColor: color_red}}>
        <IconButton onClick={openChat} sx={{color: color_white}}>
          <QuestionAnswer />
        </IconButton>
      </Avatar>
      {show &&
        <Stack className="chatbot">
          <Stack className="bot_wrapper">
            <Stack className="bot_content">
              <Box className="bot_header" display={'flex'}>
                <img src={chatbotImage} alt="robot" />
                <Typography fontSize="1.5rem" ml={2}>Robott</Typography>
                <Cancel sx={{color: color_red, marginLeft: '15vh', cursor:'pointer'}} onClick={() => closeChat()} />
              </Box>
              <Home sx={{ cursor:'pointer', textAlign: 'center', ml: '15vh'}} onClick={() => resetIndex()} />
              <Stack minHeight={'250px'} justifyContent={'center'}>
              {
                !isStart &&
                  select.map((type, index) =>
                    <Button
                      key={index}
                      variant="contained"
                      fullWidth
                      sx={{bgcolor: color_red, margin: '5px', '&:hover': {bgcolor: color_red_hover}}}
                      value={type}
                      onClick={(event) =>
                        handleClick(index+1)
                      }
                    >
                      {type}
                    </Button>
                  )
              }
              { index === 1 && <WorkFlow1 />}
              { index === 2 && <WorkFlow2 />}
              { index === 3 && <WorkFlow3 />}
              { index === 4 && <WorkFlow4 />}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      }
    </Box>
  )
}

export default Chat;