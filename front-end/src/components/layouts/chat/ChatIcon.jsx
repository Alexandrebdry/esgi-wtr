import {Avatar, Badge, Stack, styled} from "@mui/material";
import img from '../../../../public/images/logo.jpg';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


export default function ({groupID, ownerID}) {

    const getChatIconWithTwoAvatars = (avatar, smallAvatar) => {

        return (
            <Stack direction="row" spacing={2}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    badgeContent={
                        <SmallAvatar alt="small icon" src={smallAvatar !==null ? smallAvatar : img}/>
                    }
                >
                    <Avatar alt="Owner icon" src={avatar? avatar: img}/>
                </Badge>
            </Stack>
        );
    }

    const getUserIcon = (userID) => {
        return null ;
    } ;

    return (
        getChatIconWithTwoAvatars(getUserIcon(ownerID), getUserIcon(groupID))
    );
}