import { PropsWithChildren, useState } from "react";
import { IsHoveringContextProvider, IsHoveringType, WithMouseHoverWrapper, WithShowIfHoveringWrapper, withShowIfHovering } from "../context/IsHoveringContext";
import Button from "./Button";
import { SubTestName, TestName, TestResponse, useTestResponse } from "../reducer/testResponseReducer";
import ToggleButton from "./ToggleButton";
import { WithTestResponseProps } from "./withTestResponse";
import { usePageString, useString } from "../texts";
import getImgSrc, { formatPng } from "./utils/getImgSrc";

interface MenuContainerProps{
    direction?: 'vertical' | 'horizontal'
};

function MenuContainer({direction = 'vertical', children}:PropsWithChildren<MenuContainerProps>){

    return(
        <WithMouseHoverWrapper listenOnly='leave'>
            <div className={`flex ${direction === 'vertical' ?
                'flex-col items-start justify-center min-w-fit pr-20'
                : 'flex-row'
            } `}>
                {children}
            </div>
        </WithMouseHoverWrapper>        
    )
}

interface MenuItemProps{
    index: IsHoveringType;
    // handleClick: (index: IsHoveringType)=>void;
    variant?: "h3" | "p"
    className?: string,
};

function MenuItem({ index, children }: PropsWithChildren<MenuItemProps>){
      
    return(
        <WithMouseHoverWrapper index={index} listenOnly='enter'>
            {children}
        </WithMouseHoverWrapper>        
    )
}

interface TestResponseMenuProps extends WithTestResponseProps{
    isActive: boolean;
    onClick: ()=>void;
};

function ExpandableResponseButton({subTestName, testResponse, setTestResponse, isActive, onClick, children}: PropsWithChildren<TestResponseMenuProps>){

    const [isHovering, setIsHovering] = useState<IsHoveringType>(false);
    const strings = usePageString('test')['city'];
    const emojis = useString('emojis');

    return(
        <ToggleButton isActive={isActive} onClick={onClick} variant="round" className="flex flex-row">
            {children}

            {/* 선택 버튼 컨테이너 (5개) */}
            <IsHoveringContextProvider value={{isHovering: isHovering, setIsHovering: setIsHovering}}>
            <MenuContainer direction='horizontal'>
                {strings.answers.map(({ label, quote, value, emoji }: { label: string, quote: string, value: number, emoji: string }, index: number) => {
                    const isUsedAsResponse = testResponse as number === value
                    console.log(subTestName, testResponse, value)

                    if (isActive || isUsedAsResponse){
                        const isUsedAsResponse = testResponse as number === value

                        /* 마우스를 올렸을 때 보이는 Element */
                        const FocusIndicator = withShowIfHovering(()=>(
                            <div className="flex flex-row">
                                <p>{emojis[emoji]}</p>
                                <p className=''>{quote}</p>
                            </div>
                        ))(index, isUsedAsResponse || undefined)

                        return(
                            /* 선택 버튼 */ 
                            <WithMouseHoverWrapper index={index} listenOnly='enter'>
                                    <p className='border-blue-500'>
                                        <ToggleButton
                                            isActive={isActive && isUsedAsResponse}
                                            onClick={() => setTestResponse(value)}
                                            className='min-w-24'
                                        >   
                                            <div className="flex flex-row space-x-4 px-1 min-w-6">
                                                {label}          
                                                <FocusIndicator/>     
                                            </div>   
                                        </ToggleButton>
                                    </p>             
                            </WithMouseHoverWrapper>
                        );
                    }
                    else return(<></>);
                })}
            </MenuContainer>
            </IsHoveringContextProvider>

        </ToggleButton>  
    )
}

export default MenuContainer;

export { MenuItem, ExpandableResponseButton }

