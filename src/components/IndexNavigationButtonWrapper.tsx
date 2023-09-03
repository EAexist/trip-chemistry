import React, { PropsWithChildren } from 'react';

import { ActiveSectionContext } from "./Layout/TestPage";

interface IndexNavigationButtonWrapperProps{
    offset: number
    children: React.ReactElement;
};

function IndexNavigationButtonWrapper({ offset, children } : IndexNavigationButtonWrapperProps){

    const { activeSectionIndex, incrementActiveSectionIndex = ()=>{}, maxActiveSectionIndex = 0 } = React.useContext(ActiveSectionContext); 
    const handleClickNavigationButton = () => incrementActiveSectionIndex(offset);

    return(
        <div className={`${((offset > 0 && (activeSectionIndex < maxActiveSectionIndex)) || (offset < 0 && (activeSectionIndex > 0))) ?
        'visible' : 'invisible'}`}>
            {React.cloneElement(children, { onClick: handleClickNavigationButton })}
        </div>
    );
}
export default IndexNavigationButtonWrapper;