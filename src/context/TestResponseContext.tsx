// import React, { createContext, useContext, useState } from 'react';
// import { BudgetResponse, TestResponse, budgetResponseType, testNameType } from '../interface/interfaces';

export const TestResponseContext = () => {};

// interface TestResponseContextProps{
//     testResponse: TestResponse,
//     setTestResponse: (testResponse: TestResponse) => void | ((testResponse: TestResponse) => (testResponse: TestResponse) => void)
// } 

// const TestResponseContext = createContext<TestResponseContextProps>({} as TestResponseContextProps);

// function useTestResponseContext(name: testNameType) {
//     const {testResponse, setTestResponse} = useContext(TestResponseContext);

//     return({
//         response: testResponse[name], 
//         setResponse: (response : typeof testResponse[typeof name]) => setTestResponse({ ...testResponse, [name]: response })
//     });
// }

// function useBudgetTestResponseContext(name: testNameType, label: budgetResponseType) {
//     const {testResponse, setTestResponse} = useContext(TestResponseContext);
//     // const budgetResponse = testResponse[name] as BudgetResponse;

//     return({
//         getResponse: (name: testNameType, label: budgetResponseType) => (testResponse[name] as BudgetResponse)? (testResponse[name] as BudgetResponse)[label] : undefined, 
//         setResponse: (name: testNameType, label: budgetResponseType) => (response : number) => setTestResponse({ ...testResponse, [name]: {...testResponse[name] as {}, [label]:response} })
//     });
// }

// interface TestResponseContextProviderProps{
//     children: React.ReactNode
// };

// function TestResponseContextProvider({children}:TestResponseContextProviderProps) {
//     const [testResponse, setTestResponse] = useState<TestResponse>({} as TestResponse);
//     return (
//         <TestResponseContext.Provider value={{
//             testResponse: testResponse,
//             setTestResponse: setTestResponse
//         }}>
//             {children}
//         </TestResponseContext.Provider>
//     );
// }

// // export default TestResponseContext;
// export { TestResponseContext, TestResponseContextProvider, useTestResponseContext, useBudgetTestResponseContext };