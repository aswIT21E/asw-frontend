import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { IonIcon } from "@ionic/react";
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";

const IssuePage = () => {
  const [issue, setIssue] = useState<IIssue>();

  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, []);

  const mostrarAcividades = () => {
    // Lógica para mostrar actividades
  };

  const mostrarComentarios = () => {
    // Lógica para mostrar comentarios
  };
  console.log(issue);

  return (
    <div className={styles.issuePage}>
      <div className={styles.container}>
        <div className={styles.titleIssue}>
          <span className={styles.subjectIssue}>{issue?.subject}</span>
          <br></br>
          <br style={{ padding: "10px" }}></br>
          <div className={styles.createdByContainer}>
            <div className={styles.createdBy}>
              <a href="/">{`Created by ${issue?.creator.name}`}</a>
            </div>
          </div>
          <br></br>
          <span className={styles.descriptionIssue}>{issue?.description}</span>
          <br></br>
        </div>
        <div className={styles.infoContainer}>
      </div>
      </div>
      <div className={styles.dropdownContainer}>
        <button onClick={() => {}} className={styles.buttonOps}>
            <span
                className={`${styles.issueBall} `}
                title={issue?.type}
            ></span>
            <span className={styles.title}>
            {issue?.type}               
            </span>
        </button>
        <div className={styles.dropdown}>
        <ul className={styles.dropdownMenu}>
            <li className={`${styles.option} ${styles.bug}`}>Bug</li>
            <li className={`${styles.option} ${styles.question}`}>Question</li>
            <li className={`${styles.option} ${styles.enhancement}`}>Enhancement</li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
