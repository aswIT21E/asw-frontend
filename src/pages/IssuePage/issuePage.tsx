import React from 'react';
import styles from './issuePage.module.scss';
import { IonIcon } from '@ionic/react';

const IssuePage = () => {
  const mostrarAcividades = () => {
    // Lógica para mostrar actividades
  };

  const mostrarComentarios = () => {
    // Lógica para mostrar comentarios
  };

  return (
    <div className={styles.master}>
      <div className={styles.main}>
        <div className={styles.headerContainer}>
          <div id="detail-header" className={styles.detailHeader}></div>
        </div>
        <div className={styles.detailContent}>
          <div id="description" className={styles.description}></div>
          <button id="confirm" className={styles.saveButton} style={{ display: 'none' }}>
            Confirmar
          </button>
          <section className={styles.attachments}>
            <h2 className={styles.attachmentHeader}>
              <div className={styles.attachmentAd}>
                <span id="attachment-count"></span> Adjuntos
              </div>

              <div className={styles.attachmentContainer}>
                <label htmlFor="attachment-input" className={styles.attachmentLabel}>+</label>
                <input type="file" id="attachment-input" className={styles.attachmentInput} multiple />
              </div>
            </h2>
            <ul id="attachment-list"></ul>
          </section>
          <section className={styles.commentSection}>
            <div id="Comentarios" style={{ display: 'block' }}>
              <h2 className={styles.commentH2}>
                <span id="comment-count"></span>
                <button className={styles.botonComments} id="commentB">Comentarios</button>
                <span id="activity-count"></span>
                <button className={styles.botonComments} id="activityB" onClick={mostrarAcividades}>Actividades</button>
              </h2>
              <form id="comment-form" action="issue/:id/new-comment" method="POST">
                <div className={styles.formGroup}>
                  <input type="hidden" name="id" />
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder="Escribe un nuevo comentario aquí"
                    required
                  ></textarea>
                </div>
                <button type="submit" id="btn-comment">Comentar</button>
              </form>
              <div id="comments-section">
                <ul id="comments-list"></ul>
              </div>
            </div>
            <div id="Activities" style={{ display: 'none' }}>
              <h2 className={styles.commentH2}>
                <span id="comment-count2"></span>
                <button className={styles.botonComments} id="commentB" onClick={mostrarComentarios}>Comentarios</button>
                <span id="activity-count2"></span>
                <button className={styles.botonComments} id="activityB">Actividades</button>
              </h2>
              <div className={styles.activitiesList} id="activitylist"></div>
            </div>
          </section>
        </div>
      </div>
      <aside id="sidebar" className={styles.sidebar}>
        <button className={styles.botonLock} onClick={() => {}}>
          <i className="fas fa-home btn-icon"></i> Home
        </button>
        <section id="atributos"></section>
        <section id="assign" className={styles.assign}>
          <div className={styles.labelTicket}>
            <span>Asignado</span>
          </div>
          <div className={styles.assignList}>
            <div id="ticket-user-list" className={styles.ticketUserList}>
              <div className={`${styles.assign2} ${styles.Comentarios} ${styles.User}`}>
                <div className={styles.userListName}></div>
              </div>
            </div>
            <div className={styles.ticketUserActions}>
              <div className={styles.iconAdd}>
                {/* <IonIcon name="add-outline" className={styles.plusIcon}></IonIcon> */}
                </div>
              <div id="link1"></div>
            </div>
          </div>
        </section>
        <section id="watchers" className={styles.watchers}>
          <div className={styles.labelTicket}>
            <span>Observadores</span>
          </div>
          <div className={styles.watchersList}>
            <div id="ticket-watchers-list" className={styles.ticketWatchersList}></div>
            <div className={styles.ticketUserActions}>
              <div className={styles.iconAdd}>
                <IonIcon name="add-outline" className={styles.plusIcon}></IonIcon></div>
              <div className={styles.iconNowatch}><IonIcon name="eye-off-outline" className={styles.plusIcon}></IonIcon></div>
              <div id="link2"></div>
            </div>
          </div>
        </section>
        <div style={{ display: 'flow-root', marginBottom: '1em' }}>
          <div id="butonLockUnlock"></div>
          <button id="clock-btn" style={{ marginRight: '17em' }} className={styles.botonLock}>
            <i className="fas fa-clock"></i>
          </button>
          <form id="date-form" className={styles.dateForm}>
            <label>Deadline</label>
            <input type="date" id="fecha" name="fecha" />
            <input type="submit" value="Enviar" className={styles.botonLock} />
          </form>
        </div>
        <div id="lockReason" className={styles.bloqueado}></div>
      </aside>
    </div>
  );
};

export default IssuePage;
