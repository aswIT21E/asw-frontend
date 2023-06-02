import React, { useEffect, useState } from "react";
import styles from './profile.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { IUser, IIssue } from "../../entities";
import { getUserInfo } from '../../services/getUserInfoService';
import { fetchIssues } from "../../services/issueService";

export const Profile = () => {

    const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const [issues, setIssues] = useState<IIssue[] | undefined>();
  console.log(issues);
  const [issuesWatch, setIssuesWatch] = useState<IIssue[] | undefined>();
  console.log(issuesWatch);
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();


  }, []);

  useEffect(() => {
    fetchIssuesData();
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

  };

  const handleClick = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }

  const fetchIssuesData = async () => {
    try {
      const fetchedIssues = await fetchIssues();
      const fetchedIssuesArray = fetchedIssues.issues;
      const userInfoC : IUser | undefined = userInfo;
      const issuesSorted: IIssue[] = [];
      const issuesWatchers: IIssue[] = [];
      for (const issue of fetchedIssuesArray) {
        for (const activity of issue.activity) {
          if (activity.actor === userInfoC?.id) {
            issuesSorted.push(issue);
          }
        }
      }
      for (const issue of fetchedIssuesArray) {
          for (const watcher of issue.watchers) {
            if (watcher.username === userInfoC?.username) {
              issuesWatchers.push(issue);
            }
          }
        }

      setIssues(issuesSorted);
      setIssuesWatch(issuesWatchers);
      console.log(issues);
    } catch (error) {
      console.error(error);
    }
  };

  if (!userInfo) {
    return <div>Cargando información del usuario...</div>;
  }

  return (
    <div className={styles['profile-container']}>
      <section className={styles['profile-bar']}>
        <img src={userInfo.profilePicture} className={styles['profile-image']} />
        <div className={styles['profile-data']}>
          <h1>{userInfo.name}</h1>
          <div className={styles['username']}>@{userInfo.username}</div>
          <h2>{userInfo.bio}</h2>
        </div>
        <Link to="/" className={styles['edit-profile']}>Volver</Link>
        <button onClick={handleClick} className={styles['edit-profile']}>Log Out</button>
      </section>
      <div className={styles["main"]}>
        <div className={styles["timeline-wrapper"]}>
          <nav className={styles["profile-content-tabs"]}>
            <button
              className={`${styles["tab"]} ${activeTab === "timeline" ? styles["active"] : ""}`}
              onClick={() => handleTabChange("timeline")}
            >
              Timeline
            </button>
            <button
              className={`${styles["tab"]} ${activeTab === "watchers" ? styles["active"] : ""}`}
              onClick={() => handleTabChange("watchers")}
            >
              Watchers
            </button>
          </nav>
          <div className={styles["content"]}>
            {activeTab === "timeline" && (
              <div className={styles["timeline-content"]}>
                {issues && issues.map((issue) =>
                    issue.activity?.map((activ) => (
                        <li key={activ.activity?.id} className={styles.comment}>
                        <div className={styles.commentWrapper}>
                            <img className={styles.commentImg} src={activ.actor?.profilePicture}/>
                            <div className={styles.commentInfo}>
                            <span className={styles.comment}>{activ.message}</span>
                            </div>
                        </div>
                        </li>
                    ))
                    )}

              </div>
            )}
            {activeTab === "watchers" && (
              <div className={styles["watchers-content"]}>
                {issuesWatch && issuesWatch.map((issue) =>
                        <li key={issue.numberIssue} className={styles.comment}>
                        <div className={styles.commentWrapper}>
                            <div className={styles.commentInfo}>
                            <span className={styles.comment}>"Observando" {issue.subject}</span>
                            </div>
                        </div>
                        </li>
                   
                    )}
              </div>
            )}
          </div>
        </div>
      </div>
      <section className={styles['editar-bio']}>
        <h4>Tu perfil</h4>
        <p>La gente puede ver todo lo que haces y en qué estás trabajando. Añade una buena bio para que puedan ver la mejor versión de tu perfil.</p>
        <Link to="/profile/edit-profile" className={styles['edit-profile']}>Editar Perfil</Link>
      </section>
    </div>
  );
}
