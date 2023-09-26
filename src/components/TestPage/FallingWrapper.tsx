import { animated, useSpring } from "@react-spring/web";
import { PropsWithChildren } from "react";

interface FallingFoodProps{
};

function FallingWrapper({children}:PropsWithChildren<FallingFoodProps>) {
    
    const [springs, api] = useSpring(() => ({
        from: { y: 300 },
        to: { y: 0 },
    }))

    return(
        <animated.div
            style={{
            ...springs,
            }}
        >
            {children}
        </animated.div>        
    )
};

export default FallingWrapper;