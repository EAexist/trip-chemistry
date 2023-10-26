/* 테스트 응답을 위한 인터페이스 */

interface TestResponseState{
    leadership:number,    
    schedule:number,   
    // budgetSpecial:BudgetResponse,
    // budgetAverage:BudgetResponse,
    // foodBudget:BudgetResponse;
    // accomodateBudget:BudgetResponse;
    ActivityPreference:undefined;
};

interface BudgetResponseState{
    food: number;
    accomodate: number;
};


// interface BudgetResponse{
//     budgetAverage:number;
//     maxBudget:number;
// };

type budgetResponseType = 'food' | 'accomodate';
type testNameType = 'leadership' | 'schedule' | 'budgetSpecial' | 'budgetAverage' | 'ActivityPreference';

export type { TestResponseState, budgetResponseType, testNameType};
