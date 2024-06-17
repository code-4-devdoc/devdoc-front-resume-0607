import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {EducationProvider} from "./contexts/EducationContext";
import {AboutMeProvider} from "./contexts/AboutMeContext";
import {AwardProvider} from "./contexts/AwardContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <EducationProvider>
          <AboutMeProvider>
              <AwardProvider>
                  <App />
              </AwardProvider>
          </AboutMeProvider>
      </EducationProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
