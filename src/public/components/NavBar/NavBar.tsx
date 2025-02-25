import styles from './NavBar.module.css';
import { LuLogIn } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { DialogLoginStore } from '../../../store/dialogStore';
import { CiGrid42 } from "react-icons/ci";

export const NavBar = () => {
    const { setShowDialog } = DialogLoginStore();

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <CiGrid42 style={{ color: '#1e4ed8' }} size={30} />
                <Link className={styles.link} to='/'>GestãoFácil</Link>
            </div>
            <div className={styles.login} onClick={() => setShowDialog(true)}>
                <LuLogIn />
                <span>Login</span>
            </div>
        </div>
    )
}