import {Avatar, Box, ButtonGroup, Grid, IconButton, ListItem, ListItemText, Typography} from "@mui/material";
import {Fragment} from "react";
import {color_green, color_red, color_red_hover, color_white, color_white_hover} from "@/services/colors";
import {Delete, Edit, ReportProblem} from "@mui/icons-material";

function HeaderMessage ({user, message}) {
    return (
        <Box display={'flex'} alignItems={'center'} mb={1}>
            <Avatar  sx={{ width: 24, height: 24, mr: 1 , backgroundColor: message.senderID === user?.id ? color_red : color_green  }}>
                {user.firstName[0] }
            </Avatar>
            <Typography margin={0} padding={0}>{user.firstName}</Typography>
        </Box>
    )
}
function BaseTextMessage ({message, user, children}) {

    return (
        <ListItem   sx={{maxWidth:'50%', width:'fit-content', display:'flex', flexDirection:'column', alignItems:  'flex-start'}} >
            <HeaderMessage user={user} message={message}/>
            <Grid container sx={{justifyContent: message.senderID === user?.id ? 'flex-end' : ''}} >
                <Grid sx={{padding: '5px 15px', backgroundColor: message.senderID === user?.id ? color_red : color_green, height:'20px'}} borderRadius={'10px'}  item xs={12}  >
                    {children}
                </Grid>
            </Grid>
        </ListItem>
    )
}

function BaseMessage ({message, user, onMouseLeave, onMouseOver ,children}) {

    return (
            <ListItem
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
                sx={{maxWidth:'50%', width:'fit-content', display:'flex', flexDirection:'column', alignItems:  'flex-start'}}
            >
                <HeaderMessage user={user} message={message}/>
                <Grid container sx={{justifyContent: message.senderID  === user?.id ? 'flex-end' : ''}}>
                    <Grid  flex={'initial'} display={'flex'} alignItems={'center'}
                           item xs={12}
                           sx={{
                               padding: '5px 15px',
                               backgroundColor: message.senderID === user?.id ? color_red : color_green ,
                               flexDirection: 'row' ,
                               height: '50px',
                               color: color_white
                           }}
                           borderRadius={'10px'}
                    >
                        {children}
                    </Grid>
                </Grid>
            </ListItem>
    )
}

export function ModeratedMessage ({message, user}) {

    return (
        <BaseTextMessage message={message} user={user}>
            <ListItemText  sx={{fontStyle: "italic", color: color_red_hover}} align={ message.senderID === user.id  ? 'right' : 'left'} primary={'Ce message a été modéré'}/>
        </BaseTextMessage>
    )
}

export function Message ({message, user, onEdit, onDelete, onReport, onRefAdd, onMouseLeave, onMouseOver, index ,isUpdated}) {

    return (
        <BaseMessage message={message} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} user={user} >
            {isUpdated ?
                <ListItemText sx={{flex: 'initial', paddingLeft: '10px'}}
                              primary={message.text} secondary={"modifié"}/>
                :
                <ListItemText sx={{flex: 'initial', paddingLeft: '10px'}} primary={message.text}/>
            }
            <Box display={'none'} flexDirection={'row'} alignItems={'center'} ref={(ref) => {onRefAdd(ref,index)}}>
                <ButtonGroup  >
                    {
                        message.senderID === user.id ?
                            <Fragment>
                                <IconButton onClick={onEdit} >
                                    <Edit sx={{color: color_white_hover}} />
                                </IconButton>
                                <IconButton onClick={onDelete}>
                                    <Delete sx={{color: color_white_hover}} />
                                </IconButton>
                            </Fragment>
                        :
                        <IconButton onClick={onReport} >
                            <ReportProblem sx={{color: color_white_hover}} />
                        </IconButton>

                    }

                </ButtonGroup>
            </Box>
        </BaseMessage>
    )
}

