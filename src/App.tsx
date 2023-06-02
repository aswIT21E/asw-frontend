import React, { ReactNode, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import IssuePage from './pages/IssuePage/issuePage';
import { Login } from './pages/Login/login';
import { login } from './services/loginService';
import { AddIssue } from './pages/CRUD/crud';
import { BulkIssue } from './pages/CRUD/bulk';
import { Profile } from './pages/Profile/profile';
import { EditProfile } from './pages/EditProfile/editProfile';
import { userInfo } from 'os';

function App() {

  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/issue/:id" element={<IssuePage />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;