import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';


const Home: React.FC = () => {
  const handleProfileClick = () => {
    console.log('Redirigiendo al perfil del usuario');
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = (document.getElementById(
      'inputSearchbar'
    ) as HTMLInputElement).value;
    console.log('Realizando búsqueda con el valor:', inputValue);
  };

  return (
    <div className={styles['home-container']}>
      <header>
        <h1 className={styles['issue-heading']}>Issues</h1>
      </header>
      <div className={styles['search-filter']}>
        <div className={styles['search-box']}>
          <span>
            <FontAwesomeIcon icon={faSearch} className={styles['search-icon']} size="sm" />
          </span>
          <form
            id="hacerSearch"
            className={styles['search-form']}
            onSubmit={handleSearchSubmit}
          >
            <input
              className={styles['search-input']}
              type="text"
              id="inputSearchbar"
              placeholder="Subject or reference"
            />
            
            <button className={styles['search-button']} type="submit">
              <FontAwesomeIcon icon={faFilter} className={styles['bulk-icon']} />
                   Filtrar
            </button>
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
    </div>
  );
};

export default Home;
