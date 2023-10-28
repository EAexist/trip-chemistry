import { PropsWithChildren, useContext, ReactElement, cloneElement } from 'react';

import { ActiveSectionContext } from "./page/TestPage";

interface IndexNavigationButtonWrapperProps{
    offset: number
    children: ReactElement;
};

function IndexNavigationButtonWrapper({ offset, children } : IndexNavigationButtonWrapperProps){

    const { activeStep, incrementActiveSectionIndex = ()=>{}, maxActiveSectionIndex = 0 } = useContext(ActiveSectionContext); 
    const handleClickNavigationButton = () => incrementActiveSectionIndex(offset);

    return(
        <div className={`${((offset > 0 && (activeStep < maxActiveSectionIndex)) || (offset < 0 && (activeStep > 0))) ?
        'visible' : 'invisible'}`}>
            {cloneElement(children, { onClick: handleClickNavigationButton })}
        </div>
    );
}
export default IndexNavigationButtonWrapper;