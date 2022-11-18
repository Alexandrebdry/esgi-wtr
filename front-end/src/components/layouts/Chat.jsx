import React, { useState, useRef } from 'react';
import { color_white } from "../../services/colors";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Box, Typography, FilledInput } from "@mui/material";

const Chat = () => {

    const [chatMessage, setChatMessage] = useState([]);
    const [isShown, setIsShown] = useState(false);
    // const [archiveMessage, setArchiveMessaage] = useState([]);
    // const arrayMessage = []
    // const inputRef = useRef(null);

    const handleClick = async (event) => {
        if (event.key === 'Enter') {
            setChatMessage(oldArray => [...oldArray, event.target.value]);
            // console.log(inputRef.current.value);
            // setMessage(event.target.value);
            console.log(chatMessage);
            // arrayMessage.push(setMessage);
            // console.log(arrayMessage);
        }
    } 

    const openChat = event => {
        // console.log("test");
        setIsShown(current => !current);
    }

    return (
        <Box style={{display: 'flex', alignItems: 'flex-end'}} height={'100%'}>
            <QuestionAnswerIcon sx={{color: color_white}} onClick={openChat} />
            {isShown && (
                <div className="chat">
                    <Typography fontSize={"2rem"}>Chatty the Chatbot</Typography>
                    {chatMessage.map((msg) => <p key={msg}>{msg}</p>)}
                    <FilledInput
                        type="text"
                        id="message"
                        name="message"
                        // onChange={(e)=>setMessage(e.target.value)} 
                        // onKeyPress={handleClick}
                        onKeyPress={handleClick}
                        // value={message}
                    />
                    {/* {message.map((msg) => <p>{msg}</p>)} */}
                    
                </div>
            )}
        </Box>
    )
}

export default Chat;