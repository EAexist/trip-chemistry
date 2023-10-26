import { TestResponsePayload } from "../reducer/testResponseReducer";

/* GET/POST /{id}/response  */

/* DTO: GET /{id}/summary  */
interface TestResult{
    tripTagList: string[];
    tripCharacter: TripCharacter;
    // placeGroup: string[];
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

export type { 
    UserId,
    // TestResponse, BudgetResponse, 
    TestResultSummary, TestResult, TestResultDetail, TripCharacter,
}
