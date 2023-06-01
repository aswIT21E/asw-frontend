import React from 'react';
import { IActivity} from '../../entities';
import styles from './activitiesTable.module.scss';

export type issueProps = {
  activities: IActivity[];
  description: string;
};

const ActivitiesTable = ({ activities, description }: issueProps) => {
    console.log(activities)
  return (
    <div className={styles.commentTable}>
      <ul className={styles.commentList}>
        {activities?.map((activity) => (
          <li key={activity.id} className={styles.comment}>
            <div className={styles.commentWrapper}>
              <img className={styles.commentImg} src={`${activity.actor.profilePicture}`} alt="Profile" />
              <div className={styles.commentInfo}>
                {/* <div className={styles.commentData}> */}
                  {/* <span className={styles.commentCreator}>{activity.actor.name}</span> */}
                  {/* <span className={styles.commentDate}>{activity.date}</span> */}
                {/* </div> */}
                {/* <div className={styles.commentContent}> */}
                  <span className={styles.comment}>{activity.message}</span>
                  <span className={styles.title}>{description}</span>
                {/* </div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesTable;
