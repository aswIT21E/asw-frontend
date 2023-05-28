import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './pages/Home/home';
import styles from './index.module.css';

ReactDOM.render(
  <React.StrictMode>
    <App className={styles.app}>
      <Home />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
