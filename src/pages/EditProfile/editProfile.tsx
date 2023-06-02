import React from "react";
import { useState, useEffect } from "react";
import styles from './editProfile.module.scss'
import { getUserInfo } from "../../services/getUserInfoService";
import { IUser } from "../../entities";
import {submitEditProfile} from '../../services/submitEditProfileService';
import { Link, useNavigate } from "react-router-dom";

export const EditProfile = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<IUser | undefined>();
    console.log(userInfo);

    useEffect(() => {
        
        const fetchUserInfo = async () => {
            try {
                const user = await getUserInfo();
                setUserInfo(user.user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);


    if (!userInfo) {
        return <div>Cargando información del usuario...</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            name: event.target.name.value,
            bio: event.target.bio.value
        };

        // Crear una instancia de FormData para el archivo (profilePicture)
        const fileFormData = new FormData();
        fileFormData.append('file', event.target.profilePicture.files[0]);

        submitEditProfile(data, fileFormData);
        navigate('/profile');
    }


    return (
        <div className={styles['section-profile']}>
            <header>
                <h1>Configuración de Usuario</h1>
            </header>
            <div className={styles['img-avatar']}>
                <img src={userInfo.profilePicture} alt="" />
            </div>
            <div className={styles['form-data']}>
                <form onSubmit={handleSubmit}>
                <fieldset className={styles["image-container"]} id="image-container">
                    <label htmlFor="image-input" className={styles["image-label"]}>CAMBIAR FOTO</label>
                    <input type="file" id="image-input" className={styles["image-input"]} name="profilePicture" />
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input type="text" name="username" readOnly={true} placeholder={userInfo.username} />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Correo</label>
                    <input type="email" name="email" placeholder={userInfo.email} />
                </fieldset>
                <fieldset>
                    <label htmlFor="full-name">Nombre completo</label>
                    <input type="text" name="name" id="full-name" placeholder={userInfo.name} />
                </fieldset>
                <fieldset>
                <label htmlFor="bio">Bio (max. 210 caracteres)</label>
                <textarea name="bio" id="bio" maxLength={210} placeholder={userInfo.bio ? userInfo.bio : ''}></textarea>
                </fieldset>
                <fieldset className={styles["submit"]}>
                    <button type="submit" className={styles['btn-small']} title="Guardar">Guardar</button>
                </fieldset>
                </form>
            </div>
            <Link to="/profile" className={styles['edit-profile']}>Volver</Link>
        </div>
    );
}
