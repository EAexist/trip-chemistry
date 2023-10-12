import { Button } from "@mui/material";
import IndexNavigationButtonWrapper from "../components/IndexNavigationButtonWrapper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useContext } from "react";
import { ActiveSectionContext } from "../components/page/TestPage";
import NavStepper from "../components/NavStepper";
import { usePageString } from "../texts";

interface TopNavTestProps{

};

function TopNavTest({}:TopNavTestProps){

    const strings = usePageString('test');
    const sections = Object.keys(strings);

    const steps = sections?.map((label, index)=>{
        return(
            {
                label: label, 
                completed: false
            }
        ); 
    });

    const { activeSectionIndex, setActiveSectionIndex } = useContext(ActiveSectionContext); 

    const handleClickStepLabel = (index: number) => {
        setActiveSectionIndex(index); 
    }

    return(
        <div className='flex flex-row flex-auto justify-between'>
            <IndexNavigationButtonWrapper offset={-1}><Button><KeyboardArrowLeft />이전 질문</Button></IndexNavigationButtonWrapper>
            <div className='basis-6/12'>
                <NavStepper
                    steps={steps}
                    activeSectionIndex={activeSectionIndex}
                    handleClickStepLabel={handleClickStepLabel}
                    enableHover={true} />
            </div>
            <IndexNavigationButtonWrapper offset={1}><Button>다음 질문<KeyboardArrowRight/></Button></IndexNavigationButtonWrapper>
        </div>
    );   
};

export default TopNavTest;