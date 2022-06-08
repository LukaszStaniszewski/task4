import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

import { UsersProvider } from "./context/users.context";
import { CurrentUserProvider } from "./context/currentUser.context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
        <UsersProvider>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </UsersProvider>
    </React.StrictMode>
  </BrowserRouter>
);


