
/* @mui
https://mui.com/material-ui/react-accordion/ */

import React, { useState } from 'react';

function ExclusiveAccordionsContainer({ children }: React.PropsWithChildren<{}>){
    
    const [expanded, setExpanded] = useState<number>(0);
    const handleChangeAccordion = (index: number) => {
        setExpanded(index);
    };

    return (
        <div>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return (
                    <>
                        {React.cloneElement(child as JSX.Element, {
                            expanded: expanded === index,
                            handleChangeAccordion: () => handleChangeAccordion(index),
                        })}
                    </>
                    );
                }        
            })}
        </div>
    );
}

export default ExclusiveAccordionsContainer;