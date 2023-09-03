import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { basePageRoutes } from './pages';
// import Page from './components/Layout/Page';
import TestPage from './components/Layout/TestPage';

import './App.scss';


function App() {
  
  return (
    <div className='w-screen h-screen p-4'>
        <BrowserRouter>
          {basePageRoutes}        
          {/* <TopNav/> 
          <Router/>
          <ContactSection/> */}
        </BrowserRouter>
    </div>
    
  );
}

export default App;
