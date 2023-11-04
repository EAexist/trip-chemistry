import { FocusContextProvider } from '../common/focus/FocusContext'
import StepItem, { Connector } from './StepItem';

type Steps = { id: string, label: string, icon: string, postConnector?: boolean }[];

interface IconStepperProps{
  steps: Steps;
  handleClickStepButton: ( index: number ) => void;
  activeStep?: number;
  direction? : 'horizontal' | 'vertical';
  connectorSize?: 'sm' | 'md';
};

function IconStepper({ steps, handleClickStepButton, activeStep = 0, direction = 'horizontal', connectorSize = 'md' } : IconStepperProps){

  return(
    <div className={`flex ${direction === 'horizontal' ? 'flex-row items-center -translate-y-1' : 'flex-col items-center'}`}>
      <FocusContextProvider>
        {steps.map(({ id, label, icon, postConnector = true }: { id: string, label: string, icon: string, postConnector?: boolean }, index: number) => {
          return (
              <StepItem
                key={ id }
                isActive={ index === activeStep }
                index={ index }
                icon={ icon }
                label={ label }
                handleClick={ () => handleClickStepButton( index ) }
                direction={ direction }
                postConnector={  index < steps.length-1 && postConnector  }
                connectorSize={ connectorSize }
              />
          );
        })}
      </FocusContextProvider>
    </div>   
    );
};

export default IconStepper;
export type { Steps, IconStepperProps };