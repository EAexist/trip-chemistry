import { testResponsePayload } from "../reducer/testResponseReducer";

/* GET/POST /{id}/response  */
interface TestResponse{
    leadership:number|undefined;    
    schedule:number|undefined;   
    budgetSpecial:BudgetResponse;
    budgetAverage:BudgetResponse;
    // foodBudget:BudgetResponse;
    // accomodateBudget:BudgetResponse;
    activityPreference:undefined;
};
type TestResponseKey = keyof TestResponse;

interface BudgetResponse{
    food: number| undefined;
    accomodate: number| undefined;
};

type BudgetResponseKey= keyof BudgetResponse;

/* GET /{id}/summary  */
interface TestResult{
    tripCharacter: TripCharacter;
    tripTagList: string[];
    placeGroupTitle : string;
}

interface TripCharacter {
    id: string;
    name: string;
    prefix: string;
    body: string;   
}

/* GET /{id}/summary  */
interface TestResultSummary{
    label: string| undefined;
    summary: string| undefined;
    tripTagList: string[];
}

/* GET /{id}/detail  */
interface TestResultDetail{
    detail: string | undefined;
    places : Place[];
}
/* GET /{id}/places  */
// interface PlaceList{
// }

interface Place{
    title: string;
    body: string;
    tags: string[]
}

type UserId = string;

interface ChemistryResult{

};

interface withTestResponseProps{
    testName?: TestResponseKey;
    response?: TestResponse[TestResponseKey]; 
    setResponse?: (value: TestResponse[TestResponseKey]) => void;    
    setBudgetResponse?: (budgetName: BudgetResponseKey, value: BudgetResponse[BudgetResponseKey]) => void;    
};

export type { 
    UserId,
    TestResponse, BudgetResponse, 
    TestResponseKey, BudgetResponseKey,
    withTestResponseProps,
    TestResult, TestResultSummary, TestResultDetail
}
