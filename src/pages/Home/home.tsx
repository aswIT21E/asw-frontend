import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faFilter, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import Table from '../IssueTable/issueTable';
import { fetchIssues } from '../../services/issueService';
import { IIssue } from '../../entities';


const Home: React.FC = () => {
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [column, setColumn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    selectedOption !== option ? setSelectedOption(option) : setSelectedOption(null);
    console.log(option)
  };

  const handleProfileClick = () => {
    console.log('Redirigiendo al perfil del usuario');
  };
  useEffect(() => {
    
  })
  console.log('a');
  useEffect(() => {

    const filterIssues = (fetchedIssues: IIssue[]) => {
      const filteredIssues = fetchedIssues.issues.filter((issue) =>
        issue.subject.includes(searchValue) || issue.description.includes(searchValue)
      );
      const issueObject = {issues: filteredIssues};
      setIssues(issueObject);
    };

    const filterIssuesFilter = (fetchedIssues: IIssue[]) => {
      const filteredIssues = fetchedIssues.issues.filter((issue) =>
        issue[column] ===  filterValue
      );
      const issueObject = {issues: filteredIssues};
      setIssues(issueObject);
    }

    const fetchIssuesData = async () => {
      console.log('filterValue', filterValue);
      const fetchedIssues = await fetchIssues();
      if (searchValue !== '') filterIssues(fetchedIssues);
      else if (filterValue !== '' && filter)  filterIssuesFilter(fetchedIssues)
      else setIssues(fetchedIssues);
      console.log('holaaa', typeof fetchedIssues)
    };
    fetchIssuesData();
  }, [searchValue, filterValue, column]);

  function handleInputChange(e: string): void {
    setSearchValue(e);
  }

  function handleFilter(propierty: string, column: string){
    setFilterValue(propierty);
    setColumn(column);
  }

  function handleFilters(){
    console.log(filter, column, filterValue);
    !filter ? setFilter(true) : setFilter(false);
    setColumn('')
    setFilterValue('');
  }

  return (
    <div className={styles['home-container']}>
      <header>
        <h1 className={styles['issue-heading']}>Issues</h1>
      </header>
      <div className={styles['search-filter']}>
        <div className={styles['search-box']}>
        <div className={styles['search-button']} type="submit" onClick={handleFilters}>
                <FontAwesomeIcon icon={faFilter} className={styles['bulk-icon']} />
                   {!filter ? "Filtrar": "Deshacer"}
        </div>
          <form
            id="hacerSearch"
            className={styles['search-form']}
            onSubmit={(e) => {
              e.preventDefault(); // Evita que la página se recargue al enviar el formulario
            }}
          >
            <input
              className={styles['search-input']}
              type="text"
              placeholder="Subject or reference"
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </form>
        </div>
        <div className={styles['profile-button']}>
          <button id="irPerfil" onClick={handleProfileClick} className={styles['profile']}>
            <FontAwesomeIcon icon={faUser} className={styles['profile-icon']} />
            <span>      Ir al perfil</span>
          </button>
        </div>

        <Link to="/issues/newIssue" className={styles['new-issue-button']}>
          <span>+ New Issue</span>
        </Link>
        <Link to="/issues/bulk" className={styles['bulk-button']}>
          <FontAwesomeIcon icon={faFilter} className={styles['bulk-icon']} />
        </Link>
      </div>
        <div className={styles['filter-container']}>
          {filter &&
         <div className={styles.sidebar}>
         <div className={styles.options}>
           <ul>
             <li>
               <button onClick={() => handleOptionClick('Type')} className={styles['buttonOps']}>
                 <span className={styles.title}>
                  Type               
                 </span>
                 <FontAwesomeIcon icon={faCircleArrowRight} /> 
               </button>
             </li>
             {selectedOption === 'Type' && (
              <div className={styles.subOptions}>
                <ul>
                <li className={`${styles.option} ${styles.bug}`} onClick={() => handleFilter('bug', 'type')}>Bug</li>
                <li className={`${styles.option} ${styles.question}`} onClick={() => handleFilter('question', 'type')}>Question</li>
                <li className={`${styles.option} ${styles.enhancement}`} onClick={() => handleFilter('enhancement', 'type')}>Enhancement</li>
                </ul>
              </div>
              )}
             <li>
               <button onClick={() => handleOptionClick('Severity')} className={styles['buttonOps']}>
                 <span className={styles.title}>Severity</span>
                 <FontAwesomeIcon icon={faCircleArrowRight} /> 
               </button>
             </li>
             {selectedOption === 'Severity' && (
              <div className={styles.subOptions}>
                <ul>
                  <li className={`${styles.option} ${styles.pending}`} onClick={() => handleFilter('pending', 'severity', )}>Pending</li>
                  <li className={`${styles.option} ${styles.minor}`} onClick={() => handleFilter('minor', 'severity')}>Minor</li>
                  <li className={`${styles.option} ${styles.normal}`} onClick={() => handleFilter('normal', 'severity')}>Normal</li>
                  <li className={`${styles.option} ${styles.important}`} onClick={() => handleFilter('important', 'severity')}>Important</li>
                  <li className={`${styles.option} ${styles.critical}`} onClick={() => handleFilter('critical', 'severity')}>Critical</li>
                </ul>
              </div>
             )}
             <li>
               <button onClick={() => handleOptionClick('Priority')} className={styles['buttonOps']}>
                 <span className={styles.title}>Priority</span>
                 <FontAwesomeIcon icon={faCircleArrowRight} /> 
               </button>
             </li>
             {selectedOption === 'Priority' && (
              <div className={styles.subOptions}>
                <ul>
                  <li className={`${styles.option} ${styles.low}`} onClick={() => handleFilter('low', 'priority')}>Low</li>
                  <li className={`${styles.option} ${styles.normal2}`} onClick={() => handleFilter('normal', 'severity')}>Normal</li>
                  <li className={`${styles.option} ${styles.high}`} onClick={() => handleFilter('high', 'severity')}>High</li>
                </ul>
              </div>
             )}
           </ul>
         </div>
       </div>}
          <Table issuesProps={issues}/>
        </div>
    </div>
  );
};

export default Home;

