import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './crud.module.scss';
import { bulkIssue } from '../../services/bulkIssueService';

export const BulkIssue = () => {
  const [issueData, setData] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    bulkIssue(issueData,navigate);

  };

    return (
      <div className={styles['crud-container']}>
        <form 
          id="bulk-create"
          className={styles['bulk-form']}
          onSubmit={handleSubmit}
        >
          <div className={styles['cerrar']}>
            <Link to="/">X</Link>
          </div>
  
          <h2 className={styles['title']}>
            <span> BULK ISSUES</span>
          </h2>
          <div className={styles['wrapper']}>
              <div className={styles['main']}>
                <fieldset>
                  <textarea
                    name="issuesData"
                    id="descp"
                    rows={20}
                    placeholder="Inserte el Subject de los Issues que quiere crear"
                    value={issueData}
                    onChange={(event) => setData(event.target.value)}
                    data-required="true"
                  />
                </fieldset>
              </div>
             
            <div className={styles['btn-wrapper']}>
              <button id="btn-submit" type="submit">
                <span>Bulk</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );

};
