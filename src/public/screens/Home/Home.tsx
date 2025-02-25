
import { CardHome } from '../../components/CardHome/CardHome';
import DialogLogin from '../../components/DialogLogin/DialogLogin';
import { HeroSection } from '../../components/HeroSection/HeroSection';
import { dataCards } from './dados';
import styles from './Home.module.css';

import { auth } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Home = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem("idUsuario", JSON.stringify(user.uid));
            navigate('/Dashboard');
        }
    }, [user, navigate]);

    return (
        <div className={styles.home}>
            <HeroSection />
            <div className={styles.data_cards}>
                {dataCards.map((card, index) => {
                    return (
                        <CardHome key={index} data={card} />
                    )
                })}
            </div>
            <DialogLogin />
        </div>
    )

}