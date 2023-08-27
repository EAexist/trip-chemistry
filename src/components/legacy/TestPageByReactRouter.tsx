import React, { PropsWithChildren, useState } from "react";
import { Route, useLocation } from 'react-router-dom';

interface testPageProps{
    // section : 
};

function TestPage({}:testPageProps){

    const location = useLocation();

    const path = location.pathname
    console.log(`testPage location=${location}`)

    const paths = ['leadership', 'schedule', 'budget', 'specialBudget']
    const prevPath = paths.indexOf(path) 
    /** Use following pathToIndex object in case of cost issue with indexOf() */
    // const pathToIndex = paths.map((path, index) => {
    //     return 
    // })

    // const testPages = [
    //     {
    //         path: 'leadership',
    //         element: <TestLeadersip/>,
    //     },
    //     {
    //         path: 'schedule',
    //         element: <TestSchedule/>,
    //     },
    //     {
    //         path: 'budget',
    //         element: <TestBudget/>,
    //     },
    //     {
    //         path: 'specialBudget',
    //         element: <TestSpecialBudget/>,
    //     },   
    //   ];
    
    // const testPageRouter = testPages.map(({ path, element }) => {
    //     return (
    //         <Route
    //             path={path}
    //             element={element}
    //         />
    //     )
    // });
    
    // const handleClickNavigationButton = () => {

    // };

    // type testPagePaths = 'leadership' | 'schedule' ;

    // interface NavigationButtonProps{
    //     to: string 
    // }
    // function NavigationButton({ to, children }: PropsWithChildren<{}>){
    //     return(
    //         <Link to='to'>{children}</>
    //     )
    // }

    return(
        <>
        {/* <Stepper section = {section}/>
        <NavigationButton to={}>{'<'}</NavigationButton>
        <NavigationButton to={}>{'>'}</NavigationButton> */}
        </>
    );
}
// export default testPageProps;