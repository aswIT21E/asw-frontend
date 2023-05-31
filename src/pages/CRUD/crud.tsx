import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './crud.module.scss';
import { createIssue } from '../../services/createIssueService';

export const AddIssue = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [type, setType] = useState("bug");
  const [severity, setSeverity] = useState("normal");
  const [priority, setPriority] = useState("normal");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      subject,
      description,
      status,
      type,
      severity,
      priority
    };

    createIssue(data,navigate);

  };



  return (
    <div className={styles['crud-container']}>
      <form 
        id="issue-create"
        className={styles['issue-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles['cerrar']}>
          <Link to="/">X</Link>
        </div>

        <h2 className={styles['title']}>
          <span>Nueva petición</span>
        </h2>
        <div className={styles['wrapper']}>
          <div className={styles['from-wrapper']}>
            <div className={styles['main']}>
              <fieldset>
                <input
                  type="text"
                  id="inp"
                  name="subject"
                  placeholder="Asunto"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  data-required="true"
                />
              </fieldset>
              <fieldset>
                <textarea
                  name="description"
                  id="descp"
                  rows={7}
                  placeholder="Por favor, añade un texto descriptivo que ayude a otros a entender mejor esta petición"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  data-required="true"
                />
              </fieldset>
            </div>
            <div className={styles['sidebar']}>
              <div className={styles['side-wrap']}>
                <div className={styles['custom-select']}>
                  <select
                    name="status"
                    id="dropdown"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <option value="new">Nueva</option>
                    <option value="in progress">En curso</option>
                    <option value="ready for test">Lista para testear</option>
                    <option value="closed">Cerrada</option>
                    <option value="needs info">Necesita información</option>
                    <option value="rejected">Rechazada</option>
                    <option value="posposed">Pospuesta</option>
                  </select>
                </div>
              </div>

              <div className={styles['custom-params']}>
                <div className={styles['dropdown-cont']}>
                  <label htmlFor="type" className={styles['label']}>tipo</label>
                  <select
                    name="type"
                    id="dropdown2"
                    className={styles['tipo']}
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <option value="bug">Bug</option>
                    <option value="question">Pregunta</option>
                    <option value="enhancement">Mejora</option>
                  </select>
                </div>
                <div className={styles['dropdown-cont']}>
                  <label htmlFor="severity" className={styles['label']}>gravedad</label>
                  <select
                    name="severity"
                    id="dropdown2"
                    className={styles['tipo']}
                    value={severity}
                    onChange={(event) => setSeverity(event.target.value)}
                  >
                    <option value="whishlist">Deseada</option>
                    <option value="minor">Menor</option>
                    <option value="normal">Normal</option>
                    <option value="important">Importante</option>
                    <option value="critical">Crítica</option>
                  </select>
                </div>
                <div className={styles['dropdown-cont']}>
                  <label htmlFor="priority" className={styles['label']}>prioridad</label>
                  <select
                    name="priority"
                    id="dropdown2"
                    className={styles['tipo']}
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                  >
                    <option value="low">Baja</option>
                    <option value="normal">Media</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['btn-wrapper']}>
            <button id="btn-submit" type="submit">
              <span>Crear</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
