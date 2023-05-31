import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { IonIcon } from "@ionic/react";
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";
import { modifyIssue } from "../../services/modifyIssueService";

const IssuePage = () => {
  const [issue, setIssue] = useState<IIssue>();
  const [valueSelection, setValueSelection] = useState<string>('');

  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, [valueSelection]);

  const handleSelection = (value: string) => {
    setValueSelection(valueSelection === value ? '' : value);
  }
  const handleEdition = async (value: string) => {
    await modifyIssue(issue?.id, valueSelection, value)
    setValueSelection('')
  }

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
        <button className={styles.buttonOps} onClick={() => handleSelection('type')}>
            <span
                className={`${styles.issueBall}  ${ issue?.type ? styles[issue.type]: ''}`}
                title={issue?.type}
            ></span>
            <span className={styles.title}>
            {issue?.type && issue?.type.toUpperCase()}              
            </span>
        </button>
        {valueSelection === 'type' && 
            (<div className={styles.dropdown}>
                <ul className={styles.dropdownMenu}>
                    <li className={`${styles.option}`}>
                        Bug
                        <span
                        className={`${styles['issue-ball']} ${styles['bug']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option}`}>
                        Question
                        <span
                        className={`${styles['issue-ball']} ${styles['question']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `}>
                        Wishlist
                        <span
                        className={`${styles['issue-ball']} ${styles['wishlist']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                </ul>
            </div>
            )
        }
        <button className={styles.buttonOps} onClick={() => handleSelection('severity')}>
            <span
                className={`${styles.issueBall}  ${ issue?.type ? styles[issue.severity]: ''}`}
                title={issue?.type}
            ></span>
            <span className={styles.title}>
            {issue?.severity && issue?.severity.toUpperCase()}              
            </span>
        </button>
        {valueSelection === 'severity' && 
            (<div className={styles.dropdown}>
                <ul className={styles.dropdownMenu}>
                    <li className={`${styles.option}`} onClick={() => handleEdition('pending')}>
                        Pending
                        <span
                        className={`${styles['issue-ball']} ${styles['pending']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option}`} onClick={() => handleEdition('minor')}>
                        Minor
                        <span
                        className={`${styles['issue-ball']} ${styles['minor']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `} onClick={() => handleEdition('normal')}>
                        Normal
                        <span
                        className={`${styles['issue-ball']} ${styles['normal']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `} onClick={() => handleEdition('important')}>
                        Important
                        <span
                        className={`${styles['issue-ball']} ${styles['important']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `} onClick={() => handleEdition('critical')}>
                        Critical
                        <span
                        className={`${styles['issue-ball']} ${styles['critical']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                </ul>
            </div>
            )
        }
        <button className={styles.buttonOps} onClick={() => handleSelection('priority')}>
            <span
                className={`${styles.issueBall}  ${ issue?.priority ? styles[issue.priority]: ''}`}
                title={issue?.type}
            ></span>
            <span className={styles.title}>
            {issue?.priority && issue?.priority.toUpperCase()}              
            </span>
        </button>
        {valueSelection === 'priority' && 
            (<div className={styles.dropdown}>
                <ul className={styles.dropdownMenu}>
                    <li className={`${styles.option}`} onClick={() => handleEdition('low')}>
                        Low
                        <span
                        className={`${styles['issue-ball']} ${styles['low']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option}`}  onClick={() => handleEdition('normal')}>
                        Normal
                        <span
                        className={`${styles['issue-ball']} ${styles['normal2']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `}  onClick={() => handleEdition('high')}>
                        High
                        <span
                        className={`${styles['issue-ball']} ${styles['high']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                </ul>
            </div>
            )
        }
      </div>
    </div>
  );
};

export default IssuePage;
