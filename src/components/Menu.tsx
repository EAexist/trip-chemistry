import { PropsWithChildren } from "react";
import { IsHoveringType, WithHoverWrapper } from "../common/isHovering/IsHoveringContext";

interface MenuContainerProps{
    direction?: 'vertical' | 'horizontal'
};

function MenuContainer({direction = 'vertical', children}:PropsWithChildren<MenuContainerProps>){

    return(
        <WithHoverWrapper listenOnly='leave'>
            <div className={`flex ${direction === 'vertical' ?
                'flex-col items-start justify-center min-w-fit pr-20'
                : 'flex-row'
            } `}>
                {children}
            </div>
        </WithHoverWrapper>        
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
        <WithHoverWrapper id={index} listenOnly='enter'>
            {children}
        </WithHoverWrapper>        
    )
}

export { MenuContainer, MenuItem }

