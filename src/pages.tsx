import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Page Components */
import HomePage from './components/layout/HomePage';
import TestPage from './components/layout/TestPage';
import ResultPage from './components/layout/ResultPage';
import ChemistryPage from './components/layout/ChemistryPage';

/* Test Page Components */
import TestUserBudgetAverage from "./components/TestUserPage/TestUserBudgetAverage";
import TestUserLeadership from "./components/TestUserPage/TestUserLeadership";
import TestUserSchedule from "./components/TestUserPage/TestUserSchedule";
import TestUserBudgetSpecial from "./components/TestUserPage/TestUserBudgetSpecial";
import TestUserConfirm from './components/TestUserPage/TestUserConfirm';

import withTestResponse from './components/withTestResponse';
import { TestResponseKey } from './interface/interfaces';

interface routeProps {
    path: TestResponseKey | string,
    Element: React.ComponentType
    // element: React.ReactNode,
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
const testRouteProps = [
    {
        path: 'leadership',
        Element: TestUserLeadership,
    },
    {
        path: 'schedule',
        Element: TestUserSchedule,
    },
    {
        path: 'budgetAverage',
        Element: TestUserBudgetAverage,
    },
    {
        path: 'budgetSpecial',
        Element: TestUserBudgetSpecial,
    },   
    {
        path: 'confirm',
        Element: TestUserConfirm,
    },   
];

const testRoutePropsWithResponse = testRouteProps?.map(({path, Element})=>({path: path,
    Element: withTestResponse(Element)(path as TestResponseKey, path.includes('budget'))    
}));

const basePageRoutes = () =>
    <Routes>
        <Route index element={<Navigate to={'./home'} replace/>} />
        {routePropstoRoutes(basePageRouteProps)}
    </Routes>

const testPageRoutes = () => 
    <Routes>
        <Route index element={<Navigate to='./leadership' replace/>} />
        {routePropstoRoutes(testRouteProps?.map(({path, Element})=>({path: path,
            Element: withTestResponse(Element)(path as TestResponseKey, path.includes('budget'))    
        })))}
        <Route path='confirm' element={<TestUserConfirm/>}></Route>
    </Routes>;

export { basePageRouteProps, basePageRoutes, testRouteProps, testRoutePropsWithResponse, testPageRoutes }