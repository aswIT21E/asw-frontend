import React, { useEffect, useState } from 'react';
import { IUser } from '../../entities';
import styles from './assignComponent.module.scss';
import { fetchUsers } from '../../services/getUsersService';
import { assignIssue } from '../../services/assignService';
import { watchIssue } from '../../services/watchIssueService';


const AssignComponent = ({ watchers }: { watchers: boolean | undefined }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const fetchDataUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    fetchDataUsers();
  }, []);

  const handleSubmit = async () => {
    const url = window.location.href;
    const parts = url.split('/');
    const issueId = parts[4];
    if (selectedUser !== '' && watchers) await assignIssue(issueId, selectedUser);
    else if (selectedUser !== '' ) await watchIssue(issueId, [selectedUser]);
   window.location.href = '';
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className={styles.lightbox}>
      <div className={styles.cerrar}>
        <a className={styles.cerrarEnlace} href="">
          X
        </a>
      </div>
      <div className={styles.selectUserForm}>
        <h2 className={styles.title}>Selecciona usuario asignado</h2>
        <div className={styles.scrollContainer}>
          <select className={styles.customSelect} name="select" id="select" onChange={handleSelectChange}>
            <option value="">Seleccione un usuario</option>
            {Object.values(users)[0]?.map((user) => (
              <option key={user.id} value={user._id}>
                <div className={styles.userListAvatar}>
                  <img src={user.profilePicture} alt="" className={styles.imgAvatar} />
                </div>
                <div className={styles.userListName}>{user.username}</div>
              </option>
            ))}
          </select>
        </div>
        <div className={styles.userActions}>
          <button id="save-btn" className={styles.saveBtn} onClick={handleSubmit}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignComponent;
