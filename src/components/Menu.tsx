import { PropsWithChildren } from "react";
import { FocusType, Focusable } from "../common/focus/FocusContext";

interface MenuContainerProps{
    direction?: 'vertical' | 'horizontal'
};

function MenuContainer({direction = 'vertical', children}:PropsWithChildren<MenuContainerProps>){

    return(
        <Focusable listenOnly='leave'>
            <div className={`flex ${direction === 'vertical' ?
                'flex-col items-start justify-center min-w-fit pr-20'
                : 'flex-row'
            } `}>
                {children}
            </div>
        </Focusable>        
    )
}

interface MenuItemProps{
    index: FocusType;
    // handleClick: (index: FocusType)=>void;
    variant?: "h3" | "p"
    className?: string,
};

function MenuItem({ index, children }: PropsWithChildren<MenuItemProps>){
      
    return(
        <Focusable id={index} listenOnly='enter'>
            {children}
        </Focusable>        
    )
}

export { MenuContainer, MenuItem }

