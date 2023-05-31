import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './index.module.css';
import App from './App';
import Home from './pages/Home/home';
import { AddIssue } from './pages/CRUD/crud';
import { Login } from './pages/Login/login';
import { login } from './services/loginService';

const Index = () => {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <React.StrictMode>
      <App className={styles.app}>
        <Routes>
          <Route
            path="/"
            element={
              authenticated ? (
                <Home />
              ) : (
                <Login login={(username, password) => login(username, password, setAuthenticated)} />
              )
            }
          />
          <Route path="/login" element={<Login login={(username, password) => login(username, password, setAuthenticated)} />} />
          <Route path="/issues/newIssue" element={<AddIssue />} />
        </Routes>
      </App>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
