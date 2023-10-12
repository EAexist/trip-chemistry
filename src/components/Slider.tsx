import { Slider as MuiSlider, SxProps } from "@mui/material";

interface SliderProps {
    step: number;
    min: number;
    max: number; 
    valueLabelDisplay:'on'|'off'|'auto'
    size?: 'small'
    onChange?: (event: Event, newValue: number | number[]) => void;
    getAriaValueText?: ((value: number, index: number) => string) | undefined;
    'aria-label'?: string;
    sx?: SxProps;
}

export default function Slider (sliderProps : SliderProps) {

    return(
        <>
        <MuiSlider
            aria-label='budget'
            defaultValue={sliderProps.min}
            marks
            {...sliderProps}
        />        
        </>
    );
}