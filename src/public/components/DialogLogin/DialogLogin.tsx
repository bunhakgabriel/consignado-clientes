import { useEffect, useState } from 'react';
import { DialogLoginStore } from '../../../store/dialogStore';
import styles from './DialogLogin.module.css';

import { MdClose } from "react-icons/md";
import { Dialog } from '../../../components/Dialog/Dialog';
import { CiGrid42 } from 'react-icons/ci';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { checkAndCreateUser } from '../../service/Login';


function DialogLogin() {
    const { setShowDialog, showDialog } = DialogLoginStore();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (showDialog) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else if (!showDialog && isAnimating) {
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    }, [showDialog]);

    useEffect(() => {
        if (user && user.uid && user.email) {
            checkAndCreateUser({
                id: user.uid,
                email: user.email,
                photoUrl: user.photoURL || ''
            })
        }
    }, [user]);

    const handleClose = () => {
        setIsAnimating(false);
        setShowDialog(false);
    };

    const handleGoogleSignIn = () => {

        signInWithPopup(auth, provider)
            .then(() => {
                handleClose();
                console.log('sucesso ao autenticar')
            })
            .catch(error => {
                console.log(error, ': erro ao autenticar');
            })
    }

    if (!isVisible) return null;

    return (
        <Dialog>
            <div className={`${styles.dialog_login} ${isAnimating ? styles.open : ''}`}>
                <div className={styles.modal}>
                    <button onClick={handleClose} className={styles.closeButton}>
                        <MdClose size={24} />
                    </button>

                    <div className={styles.content}>
                        <div className={styles.logoContainer}>
                            <CiGrid42 size={48} style={{ color: '#1e4ed8' }} />
                        </div>
                        <h1 className={styles.title}>GestãoFácil</h1>

                        <div className={styles.mainContent}>
                            <p className={styles.text}>
                                Ao tocar em Entrar ou continuar, você concorda com os nossos Termos.
                                Saiba como processamos seus dados em nossa Política de Privacidade e Política de Cookies.
                            </p>
                            <button
                                className={styles.googleButton}
                                onClick={() => handleGoogleSignIn()}
                            >
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className={styles.googleIcon}
                                />
                                Continuar com o Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default DialogLogin;
