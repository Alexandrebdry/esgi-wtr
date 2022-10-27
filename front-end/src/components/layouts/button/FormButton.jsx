import {color_red, color_red_hover} from "../../../services/colors";
import {Button} from "@mui/material";

export default function ({name}) {

    return (
        <Button
            sx={{bgcolor: color_red, '&:hover': {bgcolor: color_red_hover}}}
            type={"submit"} fullWidth variant={"contained"} >
            {name}
        </Button>
    )
}