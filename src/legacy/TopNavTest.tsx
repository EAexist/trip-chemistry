import { Button } from "@mui/material";
import IndexNavigationButtonWrapper from "../components/IndexNavigationButtonWrapper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useContext } from "react";
import { ActiveSectionContext } from "../components/page/TestPage";
import IconStepper from "../components/IconStepper";
import { usePageString } from "../texts";

interface TopNavTestProps{

};

function TopNavTest({}:TopNavTestProps){

    const strings = usePageString('test');

    const steps = Object.entries( strings ).map(( [ id, index ] )=>{
        return( 
            {
                id: id,
                label: id, 
                icon: "",
                completed: false
            }
        ); 
    });

    const { activeStep, setActiveStep } = useContext(ActiveSectionContext); 

    const handleClickStepLabel = ( index: number ) => {
        // setActiveStep( id ); 
    }

    return(
        <div className='flex flex-row flex-auto justify-between'>
            <IndexNavigationButtonWrapper offset={-1}><Button><KeyboardArrowLeft />이전 질문</Button></IndexNavigationButtonWrapper>
            <div className='basis-6/12'>
                <IconStepper
                    steps={ steps }
                    activeStep={ activeStep }
                    handleClickStepButton={ handleClickStepLabel }
                />
            </div>
            <IndexNavigationButtonWrapper offset={1}><Button>다음 질문<KeyboardArrowRight/></Button></IndexNavigationButtonWrapper>
        </div>
    );   
};

export default TopNavTest;