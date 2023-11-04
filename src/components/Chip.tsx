import { Chip as MuiChip } from "@mui/material";
import { PropsWithChildren } from "react";
interface ChipProps{
    label: string;
};

function Chip({label, children}:PropsWithChildren<ChipProps>){
    return(
        <h6><MuiChip label={label}/></h6>
    );
};

export default Chip;