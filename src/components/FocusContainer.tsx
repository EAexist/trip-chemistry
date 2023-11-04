import { FocusContextProvider, FocusType, Focusable, useFocusContext, withHoverProps, withFocusContext, FocusDetail } from "../common/focus/FocusContext";
import { PropsWithChildren, useContext, useState } from "react";

interface FocusContainerProps{
    classNameWithSize: string;
    animationClassName?: string;
};

/* 이미지와 텍스트를 포함한 카드. 마우스를 올리면 확대되며 추가적인 디테일(children componenet) 를 보여줌.*/
function FocusContainer({ classNameWithSize, animationClassName, children }: PropsWithChildren<FocusContainerProps>){

    const { focus } = useFocusContext();
    return(
        <Focusable>
            <div className={`${classNameWithSize} w-64 relative flex items-center justify-center`}>
                <div
                    className={`${classNameWithSize} w-64 ${animationClassName}
                        ${(focus === true) ? 'absolute z-10' : 'z-0'} 
                        max-md:hover:h-72`
                    }
                >
                    {children}
                </div>
            </div>
        </Focusable>
    );
};

export default withFocusContext(FocusContainer) 
