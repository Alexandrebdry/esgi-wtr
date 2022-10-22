import {List} from "@mui/material";
import {color_white} from "../../../services/colors";

export default function ({color = color_white, children, sx}) {

    return (
        <List sx={{color: color, ...sx}}>
            {children}
        </List>
    );

}