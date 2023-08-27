import { Stepper, Step, StepLabel } from "@mui/material";

interface step{
  label: string,
  completed?: Boolean,
  active?: Boolean,
};

interface StepperProps{
    steps: step[] 
    activeStepIndex: number
};

function TestStepper({ steps, activeStepIndex }:StepperProps){

    return(
      <Stepper activeStep={activeStepIndex} alternativeLabel>
        {steps.map(({label}) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>       
    );
}
export default TestStepper;