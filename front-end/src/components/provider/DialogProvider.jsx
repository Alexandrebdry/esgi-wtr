import {createContext, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {IconButton, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {color_red} from "../../services/colors";

export const DialogContext = createContext({}) ;
const DialogProvider = ({children}) => {

    const [open, setOpen] = useState(false) ;
    const [title, setTitle]= useState('') ;
    const [content, setContent] = useState('') ;

    const closeDialog = () => {
        setOpen(false) ;
    }
    const openDialog = () => {
        setOpen(true) ;
    }

    return (
        <DialogContext.Provider value={{setOpen, setTitle, setContent, closeDialog, openDialog}}>
            <Dialog open={open} >
                <DialogTitle display={"flex"} alignItems={'center'} justifyContent={"space-between"}>
                    <Typography>{title}</Typography>
                    <IconButton onClick={()=>{setOpen(false)}}>
                        <Close sx={{color: color_red}}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {content}
                </DialogContent>
            </Dialog>
            {children}
        </DialogContext.Provider>
    )
}

export default DialogProvider ;