import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App({ children }: { children: ReactNode }) {
  
  return (
    <BrowserRouter>
      <div className="App">
        {children}
      </div>
    </BrowserRouter>
  );
}

export default App;