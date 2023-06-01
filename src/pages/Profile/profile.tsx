
import React, {useEffect, useState} from "react";
import styles from './profile.module.scss';
import { Link } from "react-router-dom";
import { IUser } from "../../entities";
import {getUserInfo} from '../../services/getUserInfoService';



export const Profile = () => { 

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
    return (
        <div className={styles['profile-container']}>
            <section className={styles['profile-bar']}>
                <img src={userInfo.profilePicture} className={styles['profile-image']}/>
                <div className={styles['profile-data']}>
                    <h1>{userInfo.name}</h1>
                    <div className={styles['username']}>@{userInfo.username}</div>
                    <h2>{userInfo.bio}</h2>
                </div>
                <Link to="/" className={styles['edit-profile']}>Volver</Link>
            </section>
            <div className={styles["main"]}>
                <div className={styles["timeline-wrapper"]}>
                    <nav className={styles["profile-content-tabs"]}>
                        
                    </nav>
                </div>
            </div>
            <section className={styles['editar-bio']}>
                <h4>Tu perfil</h4>
                <p>La gente puede ver todo lo que haces y en qué estás trabajando. Añade una buena bio para que puedan ver la mejor versión de tu perfil.</p>
                <Link to="/profile/edit-profile" className={styles['edit-profile']}>Editar Perfil</Link>
            </section>
            
        </div>
    );
}