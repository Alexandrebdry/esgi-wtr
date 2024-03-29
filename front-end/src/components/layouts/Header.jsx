import useScrollNavigate from "../hooks/useScrollNavigate";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../provider/UserProvider";
import logo from "../../../public/images/logo.jpg";
import {
    AppBar, Avatar,
    Box,
    ButtonBase,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {
    AccountCircle,
    AdminPanelSettings,
    ChevronRight,
    GroupAdd,
    Groups3,
    Logout,
    Menu as MenuIcon,
    Message,
    Person,
    SettingsApplications
} from "@mui/icons-material";
import {color_red, color_white} from "../../services/colors";
import CustomList from "./list/CustomList";
import CustomListItem from "./list/CustomListItem";
import {createGroup,  getGroupsServices} from "../../services/groupServices";
import ChatIcon from "./chat/ChatIcon";
import {SnackbarContext} from "../provider/SnackbarProvider";
import {GroupContext} from "../provider/GroupProvider";
import {addSocketID} from "@/services/authServices";

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


export default function () {
    const { user, setUserInformation} = useContext(UserContext) ;
    const scrollNavigate = useScrollNavigate() ;
    const {openSnackbar} = useContext(SnackbarContext) ;
    const [open, setOpen] = useState(false);
    const {conversations, setConversations, isGroupChanged, setIsGroupChanged} = useContext(GroupContext) ;


    const redirectMenu = (route) => {
        if(route === '/')
            if (!user) {
                return
            }
        scrollNavigate(route) ;
    };

    const logoutUser = async () => {
        try {
            await addSocketID({userId: user.id, socketId: null}) ;
        } catch(e) {}

        setUserInformation(null) ;
        setConversations(null) ;
        scrollNavigate('/login') ;
        openSnackbar('Vous avez été déconnecté','info');

    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const newGroup = async () => {
        await createGroup({
            maxUsers:4,
            ownerID: user.id,
            isPrivate: true,
            name: "Groupe de " + user.firstName
        });
        openSnackbar("Vous venez de créer un nouveau groupe") ;
        getConversation() ;
    }
    const getConversation = async () => {
        try {
            if(user) {
                const response = await getGroupsServices('?userId=' + user.id) ;
                const data = await response.json() ;
                const groups = [] ;
                const groupdsID = [] ;

                for (const members of data.members) {
                    groupdsID.push(members.groupId) ;
                }

                for(const group of data.groups) {
                   if ( ! groups.find( grp => grp.id === group.id))
                       if (groupdsID.find(grp => grp === group.id))
                        groups.push(group) ;
                }
                setConversations(groups);

            }

        } catch (err) {console.error(err);}
    }
    useEffect(() => {
        getConversation() ;
    },[user, isGroupChanged]) ;

    const divider = (
        <Divider sx={{bgcolor:color_white}}/>
    );
    const sellerList = (
        <ListItemButton onClick={() => {scrollNavigate('/advisor/home')}}>
            <ListItemIcon sx={{color:color_white}}> <SettingsApplications/> </ListItemIcon>
            <ListItemText primary={"Conseiller"}/>
        </ListItemButton>
    );
    const adminList = (
        <ListItemButton onClick={()=>{scrollNavigate('/admin')}}>
            <ListItemIcon sx={{color:color_white}}> <AdminPanelSettings/> </ListItemIcon>
            <ListItemText primary={"Admin"}/>
        </ListItemButton>
    );

    return (
        <header>
             <Box flexGrow={1} >
                 <AppBar color={"transparent"}  position={"fixed"} p={2} sx={{minWidth:300 , backgroundColor: color_red +'!important'}}>
                     <Toolbar>
                         <ButtonBase disableTouchRipple sx={{display:'flex', alignItems:'center', justifyContent:'center'}} onClick={() => {redirectMenu('/')}}>
                             <Avatar sx={{mr:2}} width={50} height={50} alt={'Logo du site'} src={logo} />
                             <Typography style={{color:color_white}}>Un site de moto</Typography>
                         </ButtonBase>
                         <Box flexGrow={1}/>
                         <IconButton  sx={{ ...(open && { display: 'none' }) }} style={{color:color_white}} onClick={handleDrawerOpen}>
                             <MenuIcon/>
                         </IconButton>
                     </Toolbar>
                 </AppBar>
             </Box>
            <Drawer  open={open} anchor={'right'} variant={"persistent"}  sx={{width: drawerWidth, flexShrink:0 ,'& .MuiDrawer-paper': {width: drawerWidth,bgcolor: color_red},}} >
                <DrawerHeader>
                    <IconButton sx={{color:color_white}} onClick={handleDrawerClose}>
                       <ChevronRight />
                    </IconButton>
                </DrawerHeader>
                {divider}
                <Box height={'100vh'} display={"flex"} flexDirection={"column"}>
                    <CustomList children={
                        <>
                            {user && <CustomListItem text={  user?.firstName + " " + user?.lastName } />}
                            <CustomListItem icon={<AccountCircle/>} text={"Mon compte"} clickEvent={() => {scrollNavigate('/account')} } />
                            <CustomListItem icon={<GroupAdd/>} text={"Créer un groupe"} clickEvent={() => {newGroup()} }/>
                            <CustomListItem icon={<Groups3/>} text={"Gérer mes groupes"}  clickEvent={() => {scrollNavigate('/my-groups')} }/>
                        </>
                    } />
                    {divider}
                    <CustomList children={
                        <>
                            <CustomListItem icon={<Person/>} text={"Conseiller en ligne"}  />
                            {/*liste des conseillers en ligne*/}
                        </>
                    } />
                    {divider}
                    <CustomList children={
                        <>
                            <CustomListItem text={"Mes conversations"} icon={<Message/>}/>
                            { conversations && conversations.map((convo, key) => {
                                return (
                                    <CustomListItem key={key} text={convo.name} icon={<ChatIcon groupID={convo.groupID} ownerID={convo.ownerID} />} clickEvent={()=>{scrollNavigate( `/conversation/${convo.id}`)}} />
                                );
                            }) }
                        </>
                    } />
                    <Box flexGrow={1} />
                    <CustomList children={
                        <>
                            <CustomListItem icon={<Logout/>} text={"Se déconnecter"} clickEvent={() => {logoutUser()}} />
                            { user && user?.role !== 'user' && divider}
                            {
                                user && user?.role === 'advisor' &&
                                sellerList
                            }
                            {user && user?.role === 'admin' &&
                                <>
                                    {sellerList}
                                    {adminList}
                                </>

                            }
                        </>
                    } />
                </Box>
            </Drawer>
        </header>
    );


    
}