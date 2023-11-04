import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./common/store";
import { BASEPAGES, BasePageRoutes, mapPagesToRoutes } from './pages';

import './App.scss';
import { useContext, useEffect, useState } from 'react';
import TopNav, { TopNavContextProvider } from './components/TopNav';

function App() {
 
  useEffect(()=>{
      console.log(`App`);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopNavContextProvider>
          <div className='w-screen h-screen flex flex-col
            max-md:px-4'>
            <TopNav/>
            {/* <div className='full flex bg-blue-500'> */}
            <Routes>
              <Route key={'index'} index element={<Navigate to={'./home'} replace />} />
              {mapPagesToRoutes(BASEPAGES)}
            </Routes>
            {/* </div> */}
          </div>
        </TopNavContextProvider>
      </BrowserRouter>
    </Provider>    
  );
}

export default App;
