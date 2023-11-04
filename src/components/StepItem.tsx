import { Icon } from "@mui/material";
import { FocusDetail, Focusable } from "../common/focus/FocusContext";
import ToggleButton from "./ToggleButton";

interface StepItemProps{
    isActive: boolean;
    index: number;
    icon: string;
    label: string;
    handleClick: () => void
    direction?: 'horizontal' | 'vertical';
    postConnector?: boolean;
    connectorSize?: 'sm' | 'md';
};
function StepItem({ isActive, index, icon, label, handleClick, direction='horizontal', postConnector=false, connectorSize='md' }:StepItemProps){
    return(
        <div className='flex flex-col items-center'>            
        <div className='relative'>
            <Focusable id ={index}>
                <ToggleButton variant='filled' className="" isActive={isActive} onClick={handleClick}>
                    <div className='flex items-center justify-center p-2'>
                    <Icon sx={{ fontSize: 24 }}>{icon}</Icon>
                    </div>
                </ToggleButton>
            </Focusable>
            <FocusDetail id ={index}>
                <h6 className={`absolute text-center
                    ${direction === 'horizontal' ? 'left-1/2 -translate-x-1/2 translate-y-0' : '-right-1 bottom-1/2 translate-y-1/2 translate-x-full w-14'}`}>
                    {label}
                </h6>
            </FocusDetail>
        </div>
            { postConnector && 
            <Connector 
                length={`${direction === 'horizontal' ? (connectorSize === 'sm' ? 'w-12' : 'w-20') : (connectorSize === 'sm' ? 'h-8' : 'h-16')}`} 
                borderWeight={`${direction === 'horizontal' ? 'border-b-2' : 'border-l-2'}`}/>}
        </div>
    );
};

interface ConnectorProps{
    length: string;
    borderWeight?: string;
    borderColor?: string;
    borderStyle?: 'border-dotted';
};
function Connector({length, borderWeight='border-b-2', borderColor='border-black', borderStyle='border-dotted'}: ConnectorProps){
    console.log(`Connector: length=${length.toString()}`)  
    return(
        <span className={`${borderWeight} ${borderColor} ${borderStyle} ${length}`}></span>
    )
};

export default StepItem;
export { StepItem, Connector };