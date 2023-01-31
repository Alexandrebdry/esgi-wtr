import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {color_white} from "../../../services/colors";

export default function ({icon, color_icon= color_white ,text, clickEvent }) {

    const iconList = (
        icon &&
        <ListItemIcon  sx={{color:color_icon}}> {icon} </ListItemIcon>
    ) ;

    const textList = (
        text &&
        <ListItemText primary={text} />
    ) ;

    return (
        clickEvent?
            <ListItemButton sx={{width:'100%'}} onClick={clickEvent}>
                {iconList}
                {textList}
            </ListItemButton> :
            <ListItem>
                {iconList}
                {textList}
            </ListItem>
    )
}