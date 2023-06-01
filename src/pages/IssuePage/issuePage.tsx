import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";
import { createComment } from '../../services/createCommentService';
import { useNavigate } from "react-router-dom";
import CommentTable from "../CommentTable/commentTable";
import { modifyIssue} from "../../services/modifyIssueService";
import { lockIssue } from "../../services/lockService";
import { unlockIssue} from "../../services/unlockService";

import { deleteIssue } from "../../services/deleteIssueService";
import { faCheck, faEdit, faLock, faTrashCan, faUnlock } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IssuePage = () => {
  const [issue, setIssue] = useState<IIssue>();
  const [comment, setComment] = useState("");
  const [finalcomment, setFinalComment] = useState("");
  const [valueSelection, setValueSelection] = useState<string>('');
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [editionDescriptionMode, setDescriptionEditionMode] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showLockReason, setShowLockReason] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [issueLocked, setIssueLocked]= useState(issue?.locked)
  async function  handleLockIssue() {
    await setShowLockReason(true);
  }

  async function handleLockConfirmation() {
    await lockIssue(issue?.id,  lockReason);
    setShowLockReason(false);
    setLockReason('');
    setIssueLocked(true)
  }
 async function handleUnlockIssue(): void {
    await unlockIssue(issue?.id);
    setIssueLocked(false)
  }

  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, [finalcomment, valueSelection, issueLocked]);


  const mostrarAcividades = () => {
    // Lógica para mostrar actividades
  };

  const mostrarComentarios = () => {
    // Lógica para mostrar comentarios
  };
  console.log(issue);
  
  const navigate = useNavigate();

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const id = issue.id;
    const data = {
      id,
      comment,
    };

    await createComment(data,navigate);
    setFinalComment(comment)
    setComment('')
  };

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
          {issue?.locked ? (
            <span className={styles.lockText}>ESTE ISSUE ESTÁ BLOQUEADO POR EL SIGUIENTE MOTIVO: {issue.reasonLock}</span>
        ) : (null)}
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
          <div id="Comentarios">
          <h2 className="comment-h2">
            <span id="comment-count"></span>
            <button className="botoncomments" id="commentB">Comentarios</button>
            <span id="activity-count"></span>
            <button className="botoncomments" id="activityB">Actividades</button>
          </h2>
          <form 
        id="comment-form"
        className={styles['issue-form']}
        onSubmit={handleSubmitComment}
      >
          <fieldset>
                <textarea
                  name="description"
                  id="descp"
                  rows={7}
                  placeholder="Por favor, añade un texto descriptivo que ayude a otros a entender mejor esta petición"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  data-required="true"
                />
            </fieldset>
            <button type="submit" id="btn-comment">Comentar</button>
          </form>
          <div id="comments-section">
            <ul id="comments-list"></ul>
          </div>
          <CommentTable issueProps={issue} setCommentTable={setComment}/>
      </div>
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
        {issue?.locked ? (
          <button className={styles.unlockButton} onClick={() => handleUnlockIssue()}>
            <FontAwesomeIcon icon={faLock} className={styles.editButton} />
            <span className={styles.trashText}>Locked</span>
          </button>
        ) : (
          <>
          <button className={styles.lockButton} onClick={handleLockIssue}>
            <FontAwesomeIcon icon={faUnlock} className={styles.editButton} />
            <span className={styles.trashText}>Unlocked</span>
          </button>
    
          {showLockReason && (
            <>
              <input
                type="text"
                value={lockReason}
                onChange={(e) => setLockReason(e.target.value)}
              />
              <button className={styles.ConfirmLock} onClick={handleLockConfirmation}>Confirm Lock</button>
            </>
          )}
        </>
        )}

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
