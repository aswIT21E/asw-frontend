import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";
import { createComment } from '../../services/createCommentService';
import { useNavigate } from "react-router-dom";
import CommentTable from "../CommentTable/commentTable";
import ActivitiesTable from "../ActivitiesTable/activitiesTable";

import { modifyIssue} from "../../services/modifyIssueService";
import { lockIssue } from "../../services/lockService";
import { unlockIssue} from "../../services/unlockService";
import { updateDeadline } from "../../services/deadlineService";

import { deleteIssue } from "../../services/deleteIssueService";
import { faCheck, faEdit, faLock, faTrashCan, faUnlock, faTrashAlt, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import AssignComponent from "../AssignComponent/assignComponent"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const IssuePage = () => {

  const [issue, setIssue] = useState<IIssue>();
  const [comment, setComment] = useState("");
  const [finalcomment, setFinalComment] = useState("");
  const [valueSelection, setValueSelection] = useState<string>('');
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [viewAssigned, setViewAssigned] = useState<boolean>(false);
  const [viewWatchers, setViewWatchers] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>('comentarios');

  const [editionDescriptionMode, setDescriptionEditionMode] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showLockReason, setShowLockReason] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [issueLocked, setIssueLocked]= useState(issue?.locked)
  const [selectedDate, setSelectedDate] = useState<Date|null>(null);
  const [deadline, setDeadline] = useState<Date|null>(null);

 

  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, [finalcomment, valueSelection, issueLocked, deadline, selectedButton]);
 


  
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
  console.log(issue);
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

  const handleChangeView = (value: string) => {
    setSelectedButton(value)
  }

  const handleChangeSubject = (value: string) => {
    setSubject(value);
    setValueSelection('subject');
  }
  const handleChangeDescription = (value: string) => {
    setDescription(value);
    setValueSelection('description');
  }
  async function  handleLockIssue() {
    await setShowLockReason(true);
  }

  async function handleLockConfirmation() {
    await lockIssue(issue?.id,  lockReason);
    setShowLockReason(false);
    setLockReason('');
    setIssueLocked(true)
  }
 async function handleUnlockIssue() {
    await unlockIssue(issue?.id);
    setIssueLocked(false)
  }
  

  async function addDeadline(selectedDate: Date) {
    await updateDeadline(issue?.id, selectedDate)
    setDeadline(selectedDate);
    setSelectedDate(null);
  }

  
  let estilosDeadline: string;

  if (issue?.deadline && new Date(issue.deadline) < new Date()) {
    estilosDeadline = "entregaManana";
  } else if (issue?.deadline && new Date(issue.deadline) < new Date(Date.now() + 86400000 * 3)) {
    estilosDeadline = "entregaMedioTarde";
  } else {
    estilosDeadline = "entregaTarde";
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
          {issue?.locked ? (
            <div>
              <br></br>
              
              <span className={styles.lockText}> LOCKED: {issue.reasonLock}    </span>
            </div>
          ) : null}

          

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
           {issue?.deadline != null ? (
                estilosDeadline === "entregaManana" ? (
                  <div>
                    <br></br>
                    <span className={styles.entregaManana}> Deadline: {issue?.deadline?.split("T")[0]} </span>
                  </div>
            ) : estilosDeadline === "entregaMedioTarde" ? (
                  <div>
                    <br></br>
                    <span className={styles.entregaMedioTarde}> Deadline: {issue?.deadline?.split("T")[0]} </span>
                  </div>
                ) : (
                  <div>
                    <br></br>
                    <span className={styles.entregaTarde}> Deadline: {issue?.deadline?.split("T")[0]} </span>
                  </div>
                )
              ) : null}

          {/* <span className={styles.descriptionIssue}>{issue?.description}</span> */}
          <br></br>
          <div id="Comentarios">
          <h2 >
            <span id="comment-count"></span>
            <button className={selectedButton === 'comentarios' ? styles.buttonCommentsSelected : styles.buttonComments} id="commentB" onClick={() => handleChangeView('comentarios')}>Comentarios</button>
            <span id="activity-count"></span>
            <button className={selectedButton === 'actividades' ? styles.buttonCommentsSelected : styles.buttonComments} id="activityB" onClick={() => handleChangeView('actividades')}>Actividades</button>
          </h2>
          {selectedButton === 'comentarios' &&
          (
            <>
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
            </>
          )}
          {selectedButton === 'actividades' &&
          (
            <>
              <div id="comments-section">
                <ul id="comments-list"></ul>
              </div>
              <ActivitiesTable activities={issue?.activity} description={issue?.subject}/>
            </>
          )}
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
        <section className={styles.assign}>
        <div className={styles.labelTicket}>
          <span>Asignado</span>
        </div>
        <div className={styles.assignList}>
                {issue?.assignedTo && (
                    <div className={styles.list}>
                    <img src={issue?.assignedTo?.profilePicture} alt="profile assigned" className={styles.image} />
                    <div className={styles.userListName}>{issue?.assignedTo.username}</div>
                    </div>
                )}
                    <>
                    <button onClick={() => setViewAssigned(true)} className={styles.addbutton}> + Add assigned</button>
                    {viewAssigned && (<AssignComponent watchers={true}/>)}
                   </> 
          <div className={styles.ticketUserActions}>
            <div className={styles.iconAdd}>
             {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
            </div>
            <div id="link1"></div>
          </div>
        </div>
        
      </section>

      <section className={styles.assign}>
        <div className={styles.labelTicket}>
          <span>Watchers</span>
        </div>
        <div className={styles.assignList}>

        {issue?.watchers?.map((user) => 
                <div className={styles.assign}>
                {issue?.watchers && (
                    <div className={styles.list}>
                    <img src={user.profilePicture} alt="profile assigned" className={styles.image} />
                    <div className={styles.userListName}>{user.username}</div>
                    </div>
                )} 
            <div className={styles.ticketUserActions}>
            <div className={styles.iconAdd}>
            {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
            </div>
            <div id="link1"></div>
          </div>
        </div>
        )}
        </div>
        <>
          <button onClick={() => setViewWatchers(true)} className={styles.addbutton}> + Add watchers</button>
          {viewWatchers && (<AssignComponent/>)}
        </>     
      </section>

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
        <>
        <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate((e.target.value))}
              />
            {selectedDate && (
              <button className={styles.ConfirmLock} onClick={() => addDeadline(selectedDate)}>
               Add Deadline
              </button>
            )}
        </>
        
        <button className={styles.trashButton} onClick={() => handleDeleteIssue()}>
            <FontAwesomeIcon icon={faTrashCan} className={styles.editButton} />
            <Link to='/' className={styles.link}>
                <span className={styles.trashText}>
                    Eliminar        
                </span>
            </Link>
        </button>
    
      </div>
      
      <div>
    </div>
      
    </div>
  );
};

export default IssuePage;
