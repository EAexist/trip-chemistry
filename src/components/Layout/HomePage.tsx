import React, { useState, createContext } from "react";
import { Link } from 'react-router-dom';

import TestStepper from "../TestStepper";
import IndexNavigationButton from "../IndexNavigationButtonWrapper";

import Button from '../Button'

import { usePageString } from "../../texts";

interface HomePageProps{
    // section : 
};


function HomePage({}:HomePageProps){
    const page = 'home'
    const strings = usePageString(page);

    const handleClickLogin = () => {

    }

    const handleClickStart = () => {
        
    }

    return(
        <div>
            <h1>{strings.appTitle}</h1>
            <div className = 'flex flex-row'>
                <Button onClick={handleClickLogin}>{strings.loginButton}</Button>
                <Link to='/test'>
                    <Button onClick={handleClickStart}>{strings.startButton}</Button>
                </Link>
            </div>
            <div>
                <h2>{strings.infoTitle}</h2>
                <p>{strings.infoBody}</p>
            </div>
        </div>
    );
}
export default HomePage;