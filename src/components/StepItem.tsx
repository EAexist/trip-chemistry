import { Icon } from "@mui/material";
import { FocusDetail, Focusable } from "../common/focus/FocusContext";
import ToggleButton from "./ToggleButton";

interface StepItemProps{
    isActive: boolean;
    index: number;
    icon: string;
    label: string;
    handleClick: () => void
};
function StepItem({ isActive, index, icon, label, handleClick }:StepItemProps){
    return(
        <div className='relative'>                         
            <Focusable id ={index}>
                <ToggleButton className="flex items-center justify-center px-2" isActive={isActive} onClick={handleClick}>
                    <Icon sx={{ fontSize: 20 }}>{icon}</Icon>
                </ToggleButton>
            </Focusable>
            <FocusDetail id ={index} defaultShow={isActive}>
                <h6 className='absolute whitespace-nowrap left-1/2 -translate-x-1/2 translate-y-0'>{label}</h6>
            </FocusDetail>
        </div>
    );
};

interface ConnectorProps{
    width: string;
    borderWeight?: string;
    borderColor?: string;
    borderStyle?: 'border-dotted';
};
function Connector({width, borderWeight='border-b-2', borderColor='border-black', borderStyle='border-dotted'}: ConnectorProps){
    console.log(`Connector: width=${width.toString()}`)  
    return(
        <span className={`${borderWeight} ${borderColor} ${borderStyle} ${width}`}></span>
    )
};

export default StepItem;
export { StepItem, Connector };