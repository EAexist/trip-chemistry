import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'material-icons/iconfont/material-icons.css'; /* For Dynamic Display of Material Icon.  https://stackoverflow.com/questions/56369444/how-can-i-dynamically-load-an-icon-using-its-snake-case-name-react-material-ui/56369445#56369445  */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
