import React, { ReactNode, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import IssuePage from './pages/IssuePage/issuePage';
import { Login } from './pages/Login/login';
import { login } from './services/loginService';
import { AddIssue } from './pages/CRUD/crud';
import { BulkIssue } from './pages/CRUD/bulk';

function App({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/issue/:id" Component={IssuePage} />
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
          <Route path="/issues/bulk" element={<BulkIssue />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;