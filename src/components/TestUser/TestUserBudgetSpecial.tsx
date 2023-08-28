import TestUserBudgetAccordion from '../TestUserBudgetAccordion';
import ExclusiveAccordionsContainer from '../ExclusiveAccordionsContainer';

interface TestUserBudgetSpecialProps{

};

function TestUserBudgetSpecial({}:TestUserBudgetSpecialProps){
    const subTests = [
        {
            title: '비싸고 맛있는 유명 맛집',
            min: 5000,
            max: 50000,
            step: 5000
        },
        {
            title: '근사한 숙소에서의 하룻밤',
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
export default TestUserBudgetSpecial;