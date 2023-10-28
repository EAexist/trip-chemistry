import { ComponentType } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Page Components */
import HomePage from './components/page/HomePage';
import TestPage from './components/page/TestPage';
import ResultPage from './components/page/resultPage/ResultPage';
import ChemistryPage from './components/page/chemistryPage/ChemistryPage';

interface pages {
    [key: string] : {
        path: string,
        Element: ComponentType
        // element: ReactNode,
    }
}

const mapPagesToRoutes = (pages: pages) => {
    return(
        Object.entries(pages)?.map(([key, { path, Element }]) => {
            return (
                <Route
                    path={path}
                    element={<Element/>}
                />
            )
        })
    );
}

const BASEPAGES = {
    home:
        {
            path: 'home',
            Element: HomePage,
            label: "Trip Chemistry"
        },
    test:
        {
            title: 'test',
            path: 'test',
            Element: TestPage,
            label: "테스트"
        },
    result:
        {
            path: 'result',
            Element: ResultPage,
            label: "내 결과"
        },
    chemistry:
        {
            path: 'chemistry',
            Element: ChemistryPage,
            label: "여행 케미"
        },
};

function BasePageRoutes () {
    return(
        <Routes>
            <Route index element={<Navigate to={'./home'} replace/>} />
            {mapPagesToRoutes(BASEPAGES)}
        </Routes>
    )
}

export { BASEPAGES, mapPagesToRoutes, BasePageRoutes }

/* Deprecated */

/* basePageRouteProps: > pages 오브젝트로 대체 */
// const basePageRouteProps = [
//     {
//         path: 'home',
//         Element: HomePage,
//     },
//     {
//         title: 'test',
//         path: 'test/*',
//         Element: TestPage,
//     },
//     {
//         path: 'result',
//         Element: ResultPage,
//     },
//     // {
//     //     path: 'chemistry/*',
//     //     Element: ChemistryPage,
//     // },   
// ];


/* TestPage : 개별 페이지 리스트 > Swiper.js 로 대체 */
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

// const testPageRoutes = () => 
//     <Routes>
//         <Route index element={<Navigate to='./leadership' replace/>} />
//         {mapPagesToRoutes(testRouteProps?.map(({path, Element})=>({path: path,
//             Element: withTestResponse(Element)(path as TestName, path.includes('budget'))    
//         })))}
//         <Route path='confirm' element={<TestConfirm/>}></Route>
//     </Routes>;
   
// }));