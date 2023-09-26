import { Chip as MuiChip } from "@mui/material";
import { PropsWithChildren } from "react";
interface ChipProps{
    label: string;
};

function Chip({label, children}:PropsWithChildren<ChipProps>){
    return(
        <p><MuiChip label={label}/></p>
    );
};

export default Chip;