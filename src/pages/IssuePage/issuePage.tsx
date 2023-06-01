import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { faEdit, faTrashCan , faCheck} from '@fortawesome/free-solid-svg-icons';
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";
import { modifyIssue } from "../../services/modifyIssueService";
import { deleteIssue } from "../../services/deleteIssueService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IssuePage = () => {
  const [issue, setIssue] = useState<IIssue>();
  const [valueSelection, setValueSelection] = useState<string>('');
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [editionDescriptionMode, setDescriptionEditionMode] = useState<boolean>(false);

  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');


  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, [valueSelection, editionMode]);

  const handleSelection = (value: string) => {
    setValueSelection(valueSelection === value ? '' : value);
  }
  const handleEdition = async (value: string) => {
    await modifyIssue(issue?.id, valueSelection, value)
    setValueSelection('')
  }
  const changeEditionModeSubject = () => {
    if(subject !== ''){
        handleEdition(subject);
        setSubject('');
    }
    setEditionMode(!editionMode);
  }
  const changeEditionModeDescription = () => {
   // if(description !== ''){
        handleEdition(description);
        setDescription('');
    //}
    setDescriptionEditionMode(!editionDescriptionMode);
  }

  const handleDeleteIssue = async () => {
    await deleteIssue(issue?.id);
  }

  const handleChangeSubject = (value: string) => {
    setSubject(value);
    setValueSelection('subject');
  }
  const handleChangeDescription = (value: string) => {
    setDescription(value);
    setValueSelection('description');
  }


  return (
    <div className={styles.issuePage}>
      <div className={styles.container}>
        <div className={styles.titleIssue}>
          {!editionMode && (<span className={styles.subjectIssue}>#{issue?.numberIssue} {issue?.subject} </span>)}
          {!editionMode && (<span className={styles.editContainer} >
            <FontAwesomeIcon icon={faEdit} className={styles.editButton} onClick={() => changeEditionModeSubject()}/>
          </span>)}
          {editionMode && (
            <div className={styles.editContainerNO}>
                <textarea
                className={styles.editTextarea}
                value={subject === '' ? issue?.subject : subject}
                onChange={(e) => handleChangeSubject(e.target.value)}
                />
                <FontAwesomeIcon
                icon={faCheck}
                className={styles.acceptButton}
                onClick={() => changeEditionModeSubject()}
                />
            </div>
           )}
          <br></br>
          <br style={{ padding: "10px" }}></br>
          <div className={styles.createdByContainer}>
            <div className={styles.createdBy}>
              <a href="/">{`Created by ${issue?.creator.name}`}</a>
            </div>
          </div>
          <br></br>
          {!editionDescriptionMode && (<span className={styles.descriptionIssue}>{issue?.description}</span>)}
          {!editionDescriptionMode && (<span className={styles.editContainer} >
            <FontAwesomeIcon icon={faEdit} className={styles.editButton} onClick={() => changeEditionModeDescription()}/>
          </span>)}
          {editionDescriptionMode && (
            <div className={styles.editContainerNO}>
                <textarea
                className={styles.editTextarea}
                value={description === '' ? issue?.description : description}
                onChange={(e) => handleChangeDescription(e.target.value)}
                />
                <FontAwesomeIcon
                icon={faCheck}
                className={styles.acceptButton}
                onClick={() => changeEditionModeDescription()}
                />
            </div>
           )}
          {/* <span className={styles.descriptionIssue}>{issue?.description}</span> */}
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
                    <li className={`${styles.option}`} onClick={() => handleEdition('bug')}>
                        Bug
                        <span
                        className={`${styles['issue-ball']} ${styles['bug']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option}`} onClick={() => handleEdition('question')}>
                        Question
                        <span
                        className={`${styles['issue-ball']} ${styles['question']}`}
                        title={issue?.type}
                        >
                        </span>
                    </li>
                    <li className={`${styles.option} `} onClick={() => handleEdition('wishlist')}>
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
            {issue?.priority !== 'normal' && (<span
                className={`${styles.issueBall}  ${ issue?.priority ? styles[issue.priority]: ''}`}
                title={issue?.type}
            ></span>)}
            {issue?.priority === 'normal' && (<span
                className={`${styles.issueBall}  ${ issue?.type ? styles['normal2']: ''}`}
                title={issue?.type}
            ></span>)}
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
        <button className={styles.trashButton} onClick={() => handleDeleteIssue()}>
            <FontAwesomeIcon icon={faTrashCan} className={styles.editButton} />
            <Link to='/' className={styles.link}>
                <span className={styles.trashText}>
                    Eliminar        
                </span>
            </Link>
        </button>
      </div>
    </div>
  );
};

export default IssuePage;
