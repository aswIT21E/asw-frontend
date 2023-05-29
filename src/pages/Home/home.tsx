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
  const [priority, setPriority] = useState<string>('');
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
      console.log('jola', fetchedIssues);
      const filteredIssues = fetchedIssues.issues.filter((issue) =>
        issue.subject.includes(searchValue) || issue.description.includes(searchValue)
      );
      const issueObject = {issues: filteredIssues};
      setIssues(issueObject);
      console.log(typeof filteredIssues);
    };

    const fetchIssuesData = async () => {
      const fetchedIssues = await fetchIssues();
      if (searchValue !== '') filterIssues(fetchedIssues);
      else setIssues(fetchedIssues);
      console.log('holaaa', typeof fetchedIssues)
    };

    fetchIssuesData();
  }, [searchValue]);

  function handleInputChange(e: string): void {
    setSearchValue(e);
  }

  function handleFilter(propierty: string){
    
  }

  function handleFilters(){
    setFilter(!filter)
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
                   {!filter ? "Filtrar": "Esconder filtros"}
        </div>
          <form
            id="hacerSearch"
            className={styles['search-form']}
          >
            <input
              className={styles['search-input']}
              type="text"
              id="inputSearchbar"
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
                <li className={`${styles.option} ${styles.bug}`} onClick={handleFilter('bug')}>Bug</li>
                <li className={`${styles.option} ${styles.question}`}>Question</li>
                <li className={`${styles.option} ${styles.enhancement}`}>Enhancement</li>
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
                  <li className={`${styles.option} ${styles.wishlist}`}>Wishlist</li>
                  <li className={`${styles.option} ${styles.minor}`}>Minor</li>
                  <li className={`${styles.option} ${styles.normal}`}>Normal</li>
                  <li className={`${styles.option} ${styles.important}`}>Important</li>
                  <li className={`${styles.option} ${styles.critical}`}>Critical</li>
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
                  <li className={`${styles.option} ${styles.wishlist}`}>Low</li>
                  <li className={`${styles.option} ${styles.minor}`}>Normal</li>
                  <li className={`${styles.option} ${styles.normal}`}>High</li>
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

