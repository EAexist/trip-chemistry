import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./common/store";
import { BASEPAGES, BasePageRoutes, mapPagesToRoutes } from './pages';

import './App.scss';
import TopNav, { TopNavContext, TopNavContextProvider } from './components/TopNav';
import { useContext, useState } from 'react';

function App() {
 
  const [ element, setElement ] = useState<React.ReactNode>();

  return (
    <Provider store={store}>
      <div className='w-screen h-screen
        max-md:px-4'
      >
        <BrowserRouter>
          <TopNavContext.Provider
            value={{ element: element, setElement: setElement }}
          >
            <div className='fixed bg-white z-50 w-full h-fit px-16 py-4 space-x-4 flex flex-row'>
              <TopNav/>
            </div>
            <Routes>
              <Route index element={<Navigate to={'./home'} replace />} />
              {mapPagesToRoutes(BASEPAGES)}
            </Routes>
          </TopNavContext.Provider>
        </BrowserRouter>
      </div>
    </Provider>    
  );
}

export default App;
