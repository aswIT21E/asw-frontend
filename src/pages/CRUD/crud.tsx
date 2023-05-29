import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import styles from './crud.module.scss';

export const AddIssue = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Nueva");
  const [type, setType] = useState("Bug");
  const [severity, setSeverity] = useState("Normal");
  const [priority, setPriority] = useState("Media");

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

    axios.post(`${API_URL}/issues/create`, data)
      .then(response => {
        // Realizar acciones adicionales después del envío exitoso
      })
      .catch(error => {
        // Manejar el error en caso de fallo en la petición
      });
  };

  const handleClose = () => {
    // Lógica para cerrar el componente
  };

  return (
    <div className={styles['crud-container']}>
      <form 
        id="issue-create"
        className={styles['issue-form']}
        onSubmit={handleSubmit}
      >
        <div className={styles['cerrar']}>
          <button onClick={handleClose}>X</button>
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
                    <option value="Nueva">Nueva</option>
                    <option value="En curso">En curso</option>
                    <option value="Lista para testear">Lista para testear</option>
                    <option value="Cerrada">Cerrada</option>
                    <option value="Necesita información">Necesita información</option>
                    <option value="Rechazada">Rechazada</option>
                    <option value="Pospuesta">Pospuesta</option>
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
                    <option value="Bug">Bug</option>
                    <option value="Pregunta">Pregunta</option>
                    <option value="Mejora">Mejora</option>
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
                    <option value="Deseada">Deseada</option>
                    <option value="Menor">Menor</option>
                    <option value="Normal">Normal</option>
                    <option value="Importante">Importante</option>
                    <option value="Crítica">Crítica</option>
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
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
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
