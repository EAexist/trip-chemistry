import TestUserBudgetAccordion from '../TestUserBudgetAccordion';
import ExclusiveAccordionsContainer from '../ExclusiveAccordionsContainer';

interface TestUserBudgetAverageProps{

};

function TestUserBudgetAverage({}:TestUserBudgetAverageProps){

    const subTests = [
        {
            title: '한끼 식사',
            min: 5000,
            max: 50000,
            step: 5000
        },
        {
            title: '하룻밤 묵을 숙소',
            min: 10000,
            max: 100000,
            step: 10000
        },
    ]

    const testUserBudgetAccordions = subTests.map(({ title, min, max, step }, index) => {
        return (            
            <TestUserBudgetAccordion
                title={title}
                sliderProps={{
                    min: min,
                    max: max,    
                    step: step ? step : 10000
                }} 
            />
        )
    })

    return(
        <div>
            <ExclusiveAccordionsContainer>
                {testUserBudgetAccordions}   
            </ExclusiveAccordionsContainer>         
        </div>
    
    );
}
export default TestUserBudgetAverage;