import styles from './Dashboard.module.css';
import { auth } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Loader } from '../../../components/Loader/Loader';
import { UsuarioStore } from '../../../store/idUsuario';

export const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const { setIdUsuario } = UsuarioStore();

    useEffect(() => {
        if (!user && !loading) navigate('/');
        if(user) setIdUsuario(user.uid); 
    }, [loading, navigate]);

    if (loading) return <Loader />

    if (user) {
        return (
            <div className={styles.dashboard}>
                <Sidebar 
                name={user.displayName || ''} 
                email={user.email || ''} 
                />
                <Outlet />
            </div>
        )
    }

} 