import { Routes, Route, Navigate } from 'react-router-dom';

/* Page Components */
import HomePage from './components/Layout/HomePage';
import TestPage from './components/Layout/TestPage';
import ResultPage from './components/Layout/ResultPage';

/* Test Page Components */
import TestUserBudgetAverage from "./components/TestUser/TestUserBudgetAverage";
import TestUserLeadership from "./components/TestUser/TestUserLeadership";
import TestUserSchedule from "./components/TestUser/TestUserSchedule";
import TestUserBudgetSpecial from "./components/TestUser/TestUserBudgetSpecial";
import TestUserConfirm from './components/TestUser/TestUserConfirm';

interface page {
    path: string,
    element: React.ReactNode,
}

type optionalPath = string | undefined;

interface pageRoutesProps {
    pages: page[],
    indexPath? : string
};

const pageRoutes = ({ pages, indexPath = undefined}:pageRoutesProps) => {
    return(
        <Routes>
            {indexPath && <Route index element={<Navigate to={indexPath} replace/>} />}
            {pages.map(({ path, element }) => {
                return (
                    <Route
                        path={path}
                        element={element}
                    />
                )
            })}
        </Routes>
    );
}

const basePages = [
    {
        path: 'home',
        element: <HomePage/>,
    },
    {
        title: 'test',
        path: 'test/*',
        element: <TestPage/>,
    },
    {
        path: 'result',
        element: <ResultPage/>,
    },
    // {
    //     path: 'chemistry',
    //     element: <ChemistryPage/>,
    // },   
];

const testPages = [
    {
        label: '리더',
        path: 'leadership',
        element: <TestUserLeadership/>,
        title: '여행 계획은 누가 리드해?',
    },
    {
        label: '널널함',
        path: 'schedule',
        element: <TestUserSchedule/>,
        title: '일정은 얼마나 알차면 좋을까?',
    },
    {
        label: '예산',
        path: 'budget',
        element: <TestUserBudgetAverage/>,
        title: '평균적으로 얼마나 쓰면 좋을까?',
    },
    {
        label: '특별한 예산',
        path: 'specialBudget',
        element: <TestUserBudgetSpecial/>,
        title: '단 하루 특별한 경험을 위해서라면 얼마나 쓰고 싶어? ',
    },   
    {
        label: '결과 확인',
        path: 'confirm',
        element: <TestUserConfirm/>,
        title: '다시 답변하고 싶은 질문은 없어?\n 다시 한 번 확인해봐!',
    },       
];

const basePageRoutes = pageRoutes({pages: basePages, indexPath: './home'});
const testPageRoutes = pageRoutes({pages: testPages, indexPath: './leadership'});

export { basePages, basePageRoutes, testPages, testPageRoutes }