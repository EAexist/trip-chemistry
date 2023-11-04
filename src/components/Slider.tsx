import { Slider as MuiSlider, SxProps } from "@mui/material";
import { ComponentType, PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";

interface MaterialSliderProps {
    step: number;
    min: number;
    max: number; 
    value: number | number[];
    valueLabelDisplay?:'on'|'off'|'auto'
    size?: 'small'
    onChange?: (event: Event, newValue: number | number[]) => void;
    getAriaValueText?: ((value: number, index: number) => string) | undefined;
    'aria-label'?: string;
    sx?: SxProps;
}

function MaterialSlider(sliderProps : MaterialSliderProps) {

    return(
        <MuiSlider
            aria-label='budget'
            defaultValue={sliderProps.min}
            marks
            {...sliderProps}
        />   
    );
}
interface SliderProps {
    step: number;
    min: number;
    max: number;
    reverse?: boolean;
    className?: string; 
    // value: number | number[];
    // valueLabelDisplay?:'on'|'off'|'auto'
    // size?: 'small'
    // onChange?: (event: Event, newValue: number | number[]) => void;
    // getAriaValueText?: ((value: number, index: number) => string) | undefined;
    // 'aria-label'?: string;
    // sx?: SxProps;
};

interface SliderContextProps{
    min: number;
    setMin: ( min: number ) => void;
    stepWidth: number;
    setStepWidth: ( stepWidth: number ) => void;
    // min: number;
    // max: number;
};

const SliderContext = createContext<SliderContextProps>({} as SliderContextProps);

const withSliderContext = <T extends {}>(WrappedComponent: ComponentType<T>) => 
    (props: T) => {

    const [ min, setMin ] = useState<number>();
    const [ stepWidth, setStepWidth ] = useState<number>();

    return (
        <SliderContext.Provider value={{min: min, setMin: setMin, stepWidth: stepWidth, setStepWidth: setStepWidth } as SliderContextProps}>
            <WrappedComponent {...props as T}/>
        </SliderContext.Provider>
    );
}

function Slider({ step, min, max, className, children , reverse = false}: PropsWithChildren<SliderProps>) {

    const ref = useRef<HTMLDivElement>(null);
    const { setMin, setStepWidth } = useContext(SliderContext);

    /* If slider width changes, update unit step width. */
    useEffect(()=>{
        setMin(min);
        setStepWidth( (reverse? -1: 1)*(ref.current?.offsetWidth as number) / (max-min) );
        console.log(`Slider: ref.current?.offsetWidth=${ref.current?.offsetWidth} stepWidth=${(ref.current?.offsetWidth as number) * step / (max-min)}`);
    }, [ max, min, setMin, step, setStepWidth, ref ]);

    return(
        <div className={`relative ${className}`} ref={ref}>
            {children}
            {/* <div className='flex'> */}
                {/* <span className={`absolute border-b-4 border-black border-dotted w-full bg-blue-200`} /> */}
            {/* </div> */}
        </div>
    );
}
 
function SliderBackground() {
    return(<span className={`absolute border-b-2 border-gray-400 w-full`} />);
}

interface SliderItemProps{
    value: number;
    className?: string;
    position?: 'up' | 'below';
};
function SliderItem({ value, className, children }: PropsWithChildren<SliderItemProps>){

    const { min, stepWidth } = useContext(SliderContext);
    const offset = Math.floor(stepWidth * (value-min));    

    console.log(`SliderItem: min=${min} stepWidth=${stepWidth} offset=${offset}`);

    return(
        <div className={`absolute bottom-0 ${className}`} style={{left: offset}}>
            {/* <div className={className}> */}
                {children}
            {/* </div> */}
        </div>
    );
}

export default withSliderContext(Slider);
export { MaterialSlider, SliderItem, SliderBackground };

/* Deprecated */
