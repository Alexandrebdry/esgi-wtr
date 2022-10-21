import useScrollNavigate from "../hooks/useScrollNavigate";
import {useContext, useState} from "react";
import {UserContext} from "../provider/UserProvider";
import logo from "../../../public/images/logo.jpg" ;
import {
    AppBar,
    Box,
    Button,
    ButtonBase,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {
    AccountCircle,
    AdminPanelSettings,
    LockOpen,
    Login,
    Logout,
    MoreVert,
    Person,
    SettingsApplications
} from "@mui/icons-material";
import {color_black, color_red, color_white} from "../../services/colors";

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

    const menuID = 'header-menu-button' ;
    const menuMobileID = 'header-mobile-menu-button' ;

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

                         <Box display={{xs:'none', md:'flex'}}>
                             {user && user?.role === 'admin' &&
                                 <Button onClick={() => {redirectMenu('/admin')}} startIcon={<AdminPanelSettings/>}>
                                     Admin
                                 </Button>
                             }
                             {user && user?.role === 'seller' || user?.role === 'admin'  &&
                                 <Button onClick={() => {redirectMenu('/sellers-pannel')}} startIcon={<SettingsApplications/>}>
                                     mon espace conseiller
                                 </Button>
                             }
                             <IconButton size="large" edge="end" aria-label="account of current"
                                 aria-controls={menuID} aria-haspopup="true" aria-expanded={isMenuOpen ? 'true' : undefined}
                                 onClick={(evt) => {handleMenu(evt)}} sx={{color:color_white,}}>
                                 <AccountCircle  fontSize="2rem"/>
                             </IconButton>
                         </Box>
                         <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                             <IconButton size="large" aria-label="show more"
                                 aria-controls={menuMobileID} aria-haspopup="true" aria-expanded={isMenuOpen ? 'true' : undefined}
                                 onClick={(evt) => {handleMenu(evt)}} sx={{color:color_white, fontSize: "2.5rem"}}>
                                 <MoreVert/>
                             </IconButton>
                         </Box>
                         {user? menuUserConnected : menuUserDisconnected}
                     </Toolbar>
                 </AppBar>
             </Box>
        </header>
    );


    
}