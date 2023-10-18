import { ComponentType } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Page Components */
import HomePage from './components/page/HomePage';
import TestPage from './components/page/TestPage';
import ResultPage from './components/page/ResultPage';

interface routeProps {
    path: string,
    Element: ComponentType
    // element: ReactNode,
}

const routePropstoRoutes = (props: routeProps[]) => {
    return(
        props?.map(({ path, Element }) => {
            return (
                <Route
                    path={path}
                    element={<Element/>}
                />
            )
        })
    );
}
const basePageRouteProps = [
    {
        path: 'home',
        Element: HomePage,
    },
    {
        title: 'test',
        path: 'test/*',
        Element: TestPage,
    },
    {
        path: 'result',
        Element: ResultPage,
    },
    // {
    //     path: 'chemistry/*',
    //     Element: ChemistryPage,
    // },   
];
// const testRouteProps = [
//     {
//         path: 'leadership',
//         Element: TestLeadershipPage,
//     },
//     {
//         path: 'schedule',
//         Element: TestSchedulePage,
//     },
//     {
//         path: 'budgetAverage',
//         Element: TestBudgetAverage,
//     },
//     {
//         path: 'budgetSpecial',
//         Element: TestBudgetSpecial,
//     },   
//     {
//         path: 'confirm',
//         Element: TestConfirm,
//     },   
// ];

// const testRoutePropsWithResponse = testRouteProps?.map(({path, Element})=>({path: path,
//     Element: withTestResponse(Element)(path as TestName, path.includes('budget'))    
// }));

const basePageRoutes = () =>
    <Routes>
        <Route index element={<Navigate to={'./home'} replace/>} />
        {routePropstoRoutes(basePageRouteProps)}
    </Routes>

// const testPageRoutes = () => 
//     <Routes>
//         <Route index element={<Navigate to='./leadership' replace/>} />
//         {routePropstoRoutes(testRouteProps?.map(({path, Element})=>({path: path,
//             Element: withTestResponse(Element)(path as TestName, path.includes('budget'))    
//         })))}
//         <Route path='confirm' element={<TestConfirm/>}></Route>
//     </Routes>;

export { basePageRouteProps, basePageRoutes }