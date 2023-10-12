import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./common/store";
import { basePageRoutes } from './pages';

import './App.scss';

function App() {
  
  return (
    <Provider store={store}>
      <div className='w-screen h-screen
      max-md:px-4
      '>
          <BrowserRouter>
            {basePageRoutes()}        
            {/* <TopNav/> 
            <Router/>
            <ContactSection/> */}
          </BrowserRouter>
      </div>
    </Provider>    
  );
}

export default App;
