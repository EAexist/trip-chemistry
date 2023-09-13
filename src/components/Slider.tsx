import { Slider as MuiSlider } from "@mui/material";

interface SliderProps {
    step: number;
    min: number;
    max: number; 
    onChange?: () => void;
    getAriaValueText?: () => void;
    'aria-label'?: string;
}

export default function Slider (sliderProps : SliderProps) {

    return(
        <>
        <MuiSlider
            aria-label='budget'
            defaultValue={sliderProps.min}
            valueLabelDisplay='on'
            marks
            sx={{width: '75%'}}
        />        
        </>
    );
}