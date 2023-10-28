import { FocusContextProvider } from '../common/focus/FocusContext'
import StepItem, { Connector } from './StepItem';

interface IconStepperProps{
  steps: {label: string, icon: string}[];
  activeStep: number;
  handleClickStepButton: (index:number) => void;
};

function IconStepper({ steps, activeStep, handleClickStepButton } : IconStepperProps){

  return(
    <div className='flex flex-row items-center -translate-y-1'>
      <FocusContextProvider>
        {steps.map(({ label, icon }: { label: string, icon: string }, index: number) => {
          return (
            <>
              {index > 0 && <Connector width='w-20' />}
              <StepItem
                isActive={index === activeStep}
                index={index}
                icon={icon}
                label={label}
                handleClick={() => handleClickStepButton(index)}
              />
            </>
          );
        })}
      </FocusContextProvider>
    </div>   
    );
};

export default IconStepper;