import React, { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import IssuePage from './pages/IssuePage/issuePage';

function App({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/issue/:id" Component={IssuePage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
