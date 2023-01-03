import {color_red, color_red_hover} from "../../../services/colors";
import {Button} from "@mui/material";

export default function ({name, form = true, clickHandler = function () {}}) {

    return (
        <Button
            sx={{bgcolor: color_red, '&:hover': {bgcolor: color_red_hover}}}
            type={form ? "submit" : 'text'} onClick={()=>{clickHandler()}} fullWidth variant={"contained"} >
            {name}
        </Button>
    )
}