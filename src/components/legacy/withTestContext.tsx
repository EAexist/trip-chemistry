import { useContext, useState, createContext, useEffect } from "react";

const withTestContext = () => {};

// interface ResponseContextProps{
//     response: number | BudgetResponse;
//     setResponse: (response: number | BudgetResponse) => void;
//     // getResponse: ()=> (response: (number | BudgetResponse));
// };

// const ResponseContext = createContext<ResponseContextProps>({} as ResponseContextProps);

// const withTestContext = (name : testNameType) => <T extends {}>(WrappedComponent: React.ComponentType<T>) => {

    // const WrappedElement = (props: T) => {

    //     const {testResponse, setTestResponse} = useContext(TestResponseContext);
    
    //     const [response, setResponse] = useState<typeof testResponse[typeof name]>(testResponse[name]);
        
    //     useEffect(() => {
    //         console.log(response)
    //     }, [response]);

    //     /* componentWillUnmount in functional component
    //         *  https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g */
    //     useEffect(() => {
    //         return () => {
    //             console.log(`name=${name}, response=${response}, testResponse=${JSON.stringify(testResponse)}`);
    //             setTestResponse({ ...testResponse, [name]: response });
    //         }
    //     }, []);
    
    //     return(
    //         <ResponseContext.Provider value={{
    //             // response: response,
    //             // setResponse: setResponse,
    //             response: response,
    //             setResponse: (response) => setTestResponse({ ...testResponse, [name]: response }),
    //         }}>
    //             <WrappedComponent {...props}/>
    //         </ResponseContext.Provider>
    //     );
    //     }
    // return(WrappedElement);
// }

// export { withTestContext };