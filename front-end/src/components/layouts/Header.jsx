import useScrollNavigate from "../hooks/useScrollNavigate";
import {useContext, useState} from "react";
import {UserContext} from "../provider/UserProvider";
import logo from "../../../public/images/logo.jpg";
import {
    AppBar,
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

export default function () {
    const { user, setUserInformation} = useContext(UserContext) ;
    const scrollNavigate = useScrollNavigate() ;
    const [anchor, setAnchor] = useState(null);
    const isMenuOpen = Boolean(anchor) ;
    const handleMenu = (evt = false) => {
        if(!evt) setAnchor(null);
        else setAnchor(evt.currentTarget) ;
    }

    const redirectMenu = (route) => {
        handleMenu();
        if(route === '/')
            if (!user) {
                return
            }
        scrollNavigate(route) ;
    }

    const logoutUser = () => {
        setUserInformation(null) ;
        scrollNavigate('/login') ;
        handleMenu();
    }
    /*
    const menuID = 'header-menu-button' ;
    const menuMobileID = 'header-mobile-menu-button' ;

    const adminMenu = (
        <MenuItem>
            <ListItemIcon> <AdminPanelSettings /> </ListItemIcon>
            <Typography variant={"inherit"}>Admin</Typography>
        </MenuItem>
    ) ;

    const sellerMenu = (
        <MenuItem>
            <ListItemIcon> <SettingsApplications /> </ListItemIcon>
            <Typography variant={"inherit"}>conseiller</Typography>
        </MenuItem>
    );

    const menuUserConnected = (
        <Menu anchorOrigin={{vertical:"top", horizontal:'left'}}  transformOrigin={{vertical:"top", horizontal:'left'}}
              anchorReference="anchorPosition" anchorPosition={{ top: 50, left: 2000 }}
              PaperProps={{   elevation: 0, sx: {overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                      '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
                      '&:before': {content: '""', display: 'block', position: 'absolute', top: 0, right: 14,
                          width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,},
                  },
              }}
             id={menuID}  open={isMenuOpen} onClose={() => {handleMenu();}}>
            <Stack color={color_black} display={"flex"} alignItems={"flex-start"} justifyContent={"flex-start"}>
                <Typography variant={'inherit'} margin={'auto'} maxWidth={'80%'} alignSelf={'center'} component={'p'} fontWeight={'bolder'} noWrap>
                    {user?.firstName} {user?.lastName}
                </Typography>
                <MenuItem color={color_black} sx={{width:'100%'}} onClick={() => {redirectMenu('/profile')}}>
                    <ListItemIcon> <Person /> </ListItemIcon>
                    <Typography variant={"inherit"}>Mon compte</Typography>
                </MenuItem>
                <MenuItem sx={{width:'100%'}} onClick={() => {logoutUser()}}>
                    <ListItemIcon> <Logout /> </ListItemIcon>
                    <Typography variant={"inherit"}>se déconnecter</Typography>
                </MenuItem>
                <Box sx={{width:'100%'}} display={{xs:'block', md:'none'}}>
                    {user && user?.role === 'admin' &&
                        <>
                            {sellerMenu}
                            {adminMenu}
                        </>
                    }
                    {user && user?.role === 'seller' &&
                        sellerMenu
                    }
                </Box>
            </Stack>
        </Menu>
    );

    const menuUserDisconnected = (

        <Menu anchorOrigin={{vertical:"top", horizontal:'left'}}  transformOrigin={{vertical:"top", horizontal:'left'}}
              anchorReference="anchorPosition" anchorPosition={{ top: 50, left: 2000 }}
              PaperProps={{elevation: 0, sx: {overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5,
                      '& .MuiAvatar-root': {width: 32, height: 32, ml: -0.5, mr: 1,},
                      '&:before': {content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10,
                          height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0,},
                  },
              }}
              id={menuID} open={isMenuOpen} onClose={() => {handleMenu();}}>
            <Stack color={color_black} display={"flex"} alignItems={"flex-start"} justifyContent={"flex-start"}>
                <MenuItem sx={{width:'100%'}} onClick={() => redirectMenu('/login')}> <Login />  <Typography variant={"inherit"}> Se connecter </Typography> </MenuItem>
                <MenuItem sx={{width:'100%'}} onClick={() => redirectMenu('/register')}> <LockOpen />   <Typography variant={"inherit"}>S'inscrire </Typography> </MenuItem>
            </Stack>
        </Menu>

    );

    const adminButton = (
        <Button sx={{ color: color_white, '&:hover': {bgcolor: color_red_hover }}} onClick={() => {redirectMenu('/admin')}} startIcon={<AdminPanelSettings/>}>
            Admin
        </Button>
    );
    const sellerButton = (
        <Button  sx={{  color: color_white, '&:hover': {bgcolor: color_red_hover }}} onClick={() => {redirectMenu('/sellers-pannel')}} startIcon={<SettingsApplications/>}>
            conseiller
        </Button>
    ); */

    const drawerWidth = 240;

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const divider = (
        <Divider sx={{bgcolor:color_white}}/>
    )

    const sellerList = (
        <ListItemButton onClick={() => {scrollNavigate('/sellers')}}>
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
                             <Box component={'img'} mr={2} width={50} height={50} alt={'Logo du site'} src={logo} />
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
                            <CustomListItem icon={<GroupAdd/>} text={"Créer un groupe"} clickEvent={() => {scrollNavigate('/create-groupe')} }/>
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
                        </>
                    } />
                    <CustomList sx={{position:'fixed', bottom:'0', width:'100%'}} children={
                        <>
                            <CustomListItem icon={<Logout/>} text={"Se déconnecter"} clickEvent={() => {logoutUser()}} />
                            { user && user?.role !== 'user' && divider}
                            {
                                user && user?.role === 'seller' &&
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
                    <List >


                    </List>
                </Box>
            </Drawer>
        </header>
    );


    
}