import React, { useEffect, useState } from "react";
import styles from "./issuePage.module.scss";
import { IIssue } from "../../entities";
import { getIssue } from "../../services/getIssueService";
import { createComment } from '../../services/createCommentService';
import { useNavigate } from "react-router-dom";
import CommentTable from "../CommentTable/commentTable";

const IssuePage = () => {
  const [issue, setIssue] = useState<IIssue>();
  const [comment, setComment] = useState("");
  const [finalcomment, setFinalComment] = useState("");

  useEffect(() => {
    const fetchDataIssue = async () => {
      const url = window.location.href;
      const parts = url.split("/");
      const issueId = parts[4];
      const fetchedIssues = await getIssue(issueId);
      setIssue(fetchedIssues);
    };
    fetchDataIssue();
  }, [finalcomment]);


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
    const id = issue?.id;
    const data = {
      id,
      comment,
    };

    await createComment(data,navigate);
    setFinalComment(comment)
    setComment('')
  };

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
