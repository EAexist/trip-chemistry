import { PropsWithChildren, useContext, ReactElement, cloneElement } from 'react';

import { ActiveSectionContext } from "./page/TestPage";

interface IndexNavigationButtonWrapperProps{
    offset: number
    children: ReactElement;
};

function IndexNavigationButtonWrapper({ offset, children } : IndexNavigationButtonWrapperProps){

    const { activeSectionIndex, incrementActiveSectionIndex = ()=>{}, maxActiveSectionIndex = 0 } = useContext(ActiveSectionContext); 
    const handleClickNavigationButton = () => incrementActiveSectionIndex(offset);

    return(
        <div className={`${((offset > 0 && (activeSectionIndex < maxActiveSectionIndex)) || (offset < 0 && (activeSectionIndex > 0))) ?
        'visible' : 'invisible'}`}>
            {cloneElement(children, { onClick: handleClickNavigationButton })}
        </div>
    );
}
export default IndexNavigationButtonWrapper;