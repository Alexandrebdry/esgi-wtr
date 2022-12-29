import {useParams} from "react-router-dom";
import {UserContext} from "@/components/provider/UserProvider";
import {useContext, useEffect, useRef, useState} from "react";
import {GroupContext} from "@/components/provider/GroupProvider";
import {Box, Grid, List} from "@mui/material";
import {EditSender, NotAllowedSender, Sender} from "@/components/layouts/message/Sender";
import {Message} from "@/components/layouts/message/Message";

export default function ({}) {

    const conversationID = useParams().id ;
    const {user} = useContext(UserContext) ;
    const {conversations, setConversations, isGroupChanged, setIsGroupChanged} = useContext(GroupContext) ;

    const [messages, setMessages] = useState([]) ;
    const [canSpeak, setCanSpeak] = useState(true) ;
    const [inEdit, setInEdit] = useState(false) ;
    const [loading, setLoading] = useState(true) ;

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
    const confirmEdit = () => {
        setInEdit(true) ;
        messageSenderRef.current.value = '' ;
    }
    const sendMessage = () => {

    }

    const deleteMessage = () => {

    }

    const editMessage = () => {

    }

    const reportMessage = () => {

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
        <Box paddingTop={20}>
            <Grid container width={'100%'} height={'80vh'}>
                {
                    ! loading &&
                    <List sx={{height:'75vh', overflow:'auto', width:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}  >
                        {
                            messages.length > 0 &&
                            messages.map((message, index) => {
                                return (
                                    <Message message={message} key={index} isUpdated={message.isUpdated}
                                             onDelete={() => deleteMessage(message)}
                                             onEdit={() => editMessage(message)}
                                             onReport={() => reportMessage(message)}
                                             user={getUserById(message.senderID)}
                                             onRefAdd={onMenusRefAdd}
                                             index={index}
                                             onMouseLeave={() => onMouseLeave(index)}
                                             onMouseOver={() => onMouseOver(index)}
                                    />
                                )
                            })
                        }
                        <Message
                            message={{
                                text: 'Hello world',
                                senderID : user?.id ,
                            }} isUpdated={false}
                            user={user}
                            onMouseLeave={() => onMouseLeave(0)}
                            onMouseOver={() => onMouseOver(0)}
                            index={0}
                            onRefAdd={onMenusRefAdd}

                        />
                        <Message
                            message={{
                                text: 'Hello world',
                                senderID : user?.id + 1 ,
                            }} isUpdated={false}
                            user={user}
                            onMouseLeave={() => onMouseLeave(1)}
                            onMouseOver={() => onMouseOver(1)}
                            index={1}
                            onRefAdd={onMenusRefAdd}
                        />
                        <Message
                            message={{
                                text: 'Hello world',
                                senderID : user?.id ,
                            }} isUpdated={false}
                            user={user}
                            onMouseLeave={() => onMouseLeave(2)}
                            onMouseOver={() => onMouseOver(2)}
                            index={2}
                            onRefAdd={onMenusRefAdd}

                        />
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

    )


}