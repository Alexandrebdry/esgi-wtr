import {useParams} from "react-router-dom";
import {UserContext} from "@/components/provider/UserProvider";
import {useContext, useEffect, useRef, useState} from "react";

import {GroupContext} from "@/components/provider/GroupProvider";
import {Box, Grid, List} from "@mui/material";
import {EditSender, NotAllowedSender, Sender} from "@/components/layouts/message/Sender";
import {Message} from "@/components/layouts/message/Message";
import {SocketContext} from "@/components/provider/SocketProvider";

export default function ({}) {

    const conversationID = useParams().id ;
    const {user} = useContext(UserContext) ;
    const {conversations, setConversations, isGroupChanged, setIsGroupChanged} = useContext(GroupContext) ;
    const [editMessage, setEditMessage] = useState("") ;
    const [messages, setMessages] = useState([]) ;
    const [canSpeak, setCanSpeak] = useState(true) ;
    const [inEdit, setInEdit] = useState(false) ;
    const [loading, setLoading] = useState(true) ;
    const {socket} = useContext(SocketContext) ;

    useEffect(() =>{
        socket.emit('join-channel', {id: conversationID}) ;

        socket.on('read-message-from-'+conversationID, message => {
            setMessages(message) ;
        }) ;

        getMessages() ;

    },[conversationID]) ;


    const getMessages = async () => {
        const response = await fetch('http://localhost:4000/api/messages?conversationId='+ conversationID, {
            headers:{
                authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token')
            }
        });
        setMessages(await response.json()) ;
    }

    const menusRef = useRef([]) ;
    const onMenusRefAdd = (elm, key) => {
        if(elm &&  !menusRef.current.includes(elm))
            menusRef.current[key] = elm;
    } ;

    const messageSenderRef = useRef() ;

    const cancelEdit = () => {
        setInEdit(false) ;
        messageSenderRef.current.value = '' ;
    }
    const confirmEdit = async () => {
        await fetch('http://localhost:4000/api/messages/'+editMessage.id, {
            method:'PATCH',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: messageSenderRef.current.children[1].children[0].value,
                isUpdated: true
            })
        })
        setInEdit(false) ;
        socket.emit('send-messages-to-'+conversationID);
        messageSenderRef.current.value = '' ;
    }
    const sendMessage = async () => {
        if(messageSenderRef.current.children[1].children[0].value !== "") {
            await fetch('http://localhost:4000/api/messsages', {
                method:'POST',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    authorID: user.id,
                    conversationID: conversationID,
                    text: messageSenderRef.current.children[1].children[0].value
                })
            });
            socket.emit('send-messages-to-'+conversationID);
            messageSenderRef.current.children[1].children[0].value = "" ;
        }

    }

    const deleteMessage = async (message) => {
        await fetch('http://localhost:4000/api/messages/'+message.id, {
            method:'DELETE',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('esgi-wtr-user-token'),
            }
        });
        socket.emit('send-messages-to-'+conversationID);
    }

    const editAMessage = (message) => {
        setInEdit(true) ;
        setEditMessage(message) ;
        messageSenderRef.current.children[1].children[0].value = message.text ;
    }

    const onMouseLeave = (index) => {
        menusRef.current[index].style.display = 'none' ;
    }
    const onMouseOver = (index) => {
        menusRef.current[index].style.display = 'block' ;
    }


    const getUserById =  () => {
        return user ;
    }

    useEffect(() => {
        if(user)
            setLoading(false) ;
    },[user]) ;

    return (
        <>

            <Box pt={6}>
                <Grid container width={'100%'} height={'80vh'} >
                    {
                        ! loading &&
                        <List sx={{ overflowY:'auto', width:'100%', height:'80vh'}}  >

                                {
                                    messages.length > 0 &&
                                    messages.map((message, index) => {
                                        return (
                                            <Message message={message} key={index} isUpdated={message.isUpdated}
                                                     onDelete={() => deleteMessage(message)}
                                                     onEdit={() => editAMessage(message)}
                                                     user={getUserById(message.senderID)}
                                                     onRefAdd={onMenusRefAdd}
                                                     index={index}
                                                     onMouseLeave={() => onMouseLeave(index)}
                                                     onMouseOver={() => onMouseOver(index)}
                                            />
                                        )
                                    })
                                }

                        </List>
                    }

                </Grid>
                <Box position={"absolute"} bottom={10} width={'100vw'}>
                    {
                        canSpeak ?
                            inEdit ?
                                <EditSender
                                    editFunction={confirmEdit}
                                    cancelFunction={cancelEdit}
                                    messageRef={messageSenderRef}
                                />
                                :
                                <Sender
                                    messageRef={messageSenderRef}
                                    sendMessage={sendMessage}
                                />
                            :
                            <NotAllowedSender/>
                    }
                </Box>
            </Box>
        </>
    )


}