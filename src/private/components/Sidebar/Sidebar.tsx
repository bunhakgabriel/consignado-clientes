import { CiCalculator2, CiGrid42, CiLogout } from 'react-icons/ci';
import styles from './Sidebar.module.css';
import { FaUsers } from "react-icons/fa";
import { auth } from '../../../firebase';
import { MdLibraryAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UsuarioStore } from '../../../store/idUsuario';

type SidebarProps = {
    name: string;
    email: string;
}

export const Sidebar = ({ name, email }: SidebarProps) => {
    const navigate = useNavigate();
    const { clearIdUsuario } = UsuarioStore();

    const logout = () => {
        if(!window.confirm('Deseja encerrar sua sessão?')) return;
        clearIdUsuario();
        localStorage.removeItem("idUsuario");
        navigate('/');
        auth.signOut();
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <CiGrid42 style={{ color: '#1e4ed8' }} size={35} />
                <span>GestãoFácil</span>
            </div>
            <ul>
                <li onClick={() => navigate('clientes')}>
                    <FaUsers size={25} />
                    <span>Clientes</span>
                </li>
                <li onClick={() => navigate('cadastrar-cliente')}>
                    <MdLibraryAdd size={25} />
                    <span>Cadastrar cliente</span>
                </li>
                <li onClick={() => navigate('calcular-taxas')}>
                    <CiCalculator2 size={25} />
                    <span>Calcular taxas</span>
                </li>
            </ul>
            <div className={styles.name}>
                <span>Olá {name}!</span>
                <CiLogout
                    size={30}
                    onClick={() => logout()}
                    style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '15px' }}>{email}</span>
            </div>
        </div>
    )
}