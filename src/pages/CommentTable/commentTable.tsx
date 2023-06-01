import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IIssue } from '../../entities';
import { IComment } from '../../entities/comment';
import styles from './commentTable.module.scss';

export type issueProps = {
  issueProps: IIssue | undefined;
  setCommentTable: Dispatch<SetStateAction<string>>;
};

const CommentTable = ({ issueProps, setCommentTable }: issueProps) => {
  return (
    <div className={styles.commentTable}>
      <ul className={styles.commentList}>
        {issueProps?.comments?.map((comment) => (
          <li key={comment._id} className={styles.comment}>
            <div className={styles.commentWrapper}>
              <img className={styles.commentImg} src={`${comment.author.profilePicture}`} alt="Profile" />
              <div className={styles.commentInfo}>
                <div className={styles.commentData}>
                  <span className={styles.commentCreator}>{comment.author.name}</span>
                  <span className={styles.commentDate}>{comment.date}</span>
                </div>
                <div className={styles.commentContent}>
                  <span className={styles.comment}>{comment.content}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentTable;
