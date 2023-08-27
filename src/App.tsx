import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { basePageRoutes } from './pages';
// import Page from './components/Layout/Page';
import TestPage from './components/Layout/TestPage';

import './App.scss';


function App() {
  
  const pages = [
    {
      path: 'leader',
      pageProps: {},
    },
  ];

  // const pageRouter = pages.map(({ path, pageProps }) => {
  //   return(
  //     <Route 
  //       path={path} 
  //       element={<Page {...pageProps}/>}
  //     />
  //   )
  // });

  return (
    <div className='App'>
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
