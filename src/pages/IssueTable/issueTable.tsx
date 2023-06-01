import React, { useEffect, useState } from 'react';
import styles from './issueTable.module.scss';
import { IIssue } from '../../entities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export type issueTableProps = {
  issuesProps: IIssue[];
};

const Table = ({ issuesProps }: issueTableProps) => {
  const [issues, setIssues] = useState<IIssue[]>([]); // Inicialmente vacío

  useEffect(() => {
    // Actualizar el estado cuando issuesProps cambie
    setIssues(issuesProps);
  }, [issuesProps]);

  const [orderField, setOrderField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (orderField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderField(field);
      setSortDirection('asc');
    }
  };

  const sortIssues = () => {
    console.log(issues);
    const sortedIssues = [...issues.issues];
    sortedIssues.sort((a, b) => {
      let aValue = a[orderField];
      let bValue = b[orderField];
      console.log(aValue,bValue)
      if (orderField === 'assignedTo') {
        aValue = a.assignedTo ? a.assignedTo.username : '';
        bValue = b.assignedTo ? b.assignedTo.username : '';
      }
      if (aValue === undefined || aValue === null) {
        return 1;
      } else if (bValue === undefined || bValue === null) {
        return -1;
      } else if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    console.log(sortedIssues);
    return sortedIssues;
  };
  

  const sortedIssues = orderField ? sortIssues() : Object.values(issues)[0];
  console.log(sortedIssues);
  function handleProfileClick(id: string) {
    console.log(id);
  }

  return (
    <div className={styles.table}>
      {/* Issue List */}
      <div className={styles.issueList}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>
              {'Type  '}
                <FontAwesomeIcon
                  icon={
                    orderField === 'type'
                      && sortDirection === 'asc' ?
                        faArrowDown : faArrowUp
                  }
                  className={styles.sortIcon}
                  onClick={() => handleSort('type')}
                />
              </th>
              <th style={{ width: '10%' }}>
              {'Severity  '}
                <FontAwesomeIcon
                  icon={
                    orderField === 'severity'
                    && sortDirection === 'asc' ?
                    faArrowDown : faArrowUp
                  }
                  className={styles.sortIcon}
                  onClick={() => handleSort('severity')}
                />
              </th>
              <th style={{ width: '10%' }}>
                {'Priority  '}
                <FontAwesomeIcon
                  icon={
                    orderField === 'priority'
                      && sortDirection === 'asc' ?
                        faArrowUp : faArrowDown
                  }
                  className={styles.sortIcon}
                  onClick={() => handleSort('priority')}
                />
              </th>
              <th>
                {'Subject  '}
                <FontAwesomeIcon
                  icon={
                    orderField === 'subject'
                      && sortDirection === 'asc' ?
                      faArrowDown : faArrowUp
                  }
                  className={styles.sortIcon}
                  onClick={() => handleSort('subject')}
                />
              </th>
              <th>
                {'Status  '}
                <FontAwesomeIcon
                  icon={
                    orderField === 'status'
                      && sortDirection === 'asc' ?
                      faArrowDown : faArrowUp
                  }
                  className={styles.sortIcon}
                  onClick={() => handleSort('status')}
                />
              </th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {sortedIssues &&
              sortedIssues.length > 0 &&
              sortedIssues.map((issue: IIssue) => (
                <tr key={issue.id} className={styles.issue}>
                  {/* Issue details */}
                  <td>
                    <span
                      className={`${styles['issue-ball']} ${styles[issue.type]}`}
                      title={issue.type}
                    ></span>
                  </td>
                  <td>
                    <span
                      className={`${styles['issue-ball']} ${styles[issue.severity]}`}
                      title={issue.severity}
                    ></span>
                  </td>
                  <td>
                    <span
                      className={`${styles['issue-ball']} ${styles[issue.priority]}`}
                      title={issue.priority}
                    ></span>
                  </td>
                    <td><Link to={`/issue/${issue._id}`}>{issue.subject}</Link></td>
                  <td>{issue.status}</td>
                  <td>{issue.assignedTo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;