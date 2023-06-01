import React from "react";
import styles from './login.module.scss';
import { useNavigate } from "react-router-dom";
import { login } from '../../services/loginService';

const users = {
  user1: {
    name: 'Quim',
    username: 'quim',
    password: 'quim',
  },
  user2: {
    name: 'Elsa',
    username: 'elsa',
    password: 'elsa',
  },
  user3: {
    name: 'Joel',
    username: 'joel',
    password: 'joel',
  }
};

export const Login = ({login}) => {
  const handleUserClick = (username: string, password: string) => {
    login(username, password)
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BIENVENIDO A TU ISSUE TRACKER</h1>
      <h2 className={styles.subtitle}>Elige un usuario</h2>
      <div className={styles.userContainer}>
        {Object.values(users).map((user, index) => (
          <button
            key={index}
            className={styles.userBox}
            onClick={() => handleUserClick(user.username, user.password)}
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};
