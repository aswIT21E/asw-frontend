import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './pages/Home/home';
import {Route, Routes} from 'react-router-dom';
import styles from './index.module.css';
import { AddIssue } from './pages/CRUD/crud';
import { BulkIssue } from './pages/CRUD/bulk';

ReactDOM.render(
  <React.StrictMode>
    <App className={styles.app}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issues/newIssue" element={<AddIssue />} />
          <Route path="/issues/bulk" element={<BulkIssue />} />
      </Routes>
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
