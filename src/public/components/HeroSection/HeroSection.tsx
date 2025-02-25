import { DialogLoginStore } from '../../../store/dialogStore';
import styles from './HeroSection.module.css';
import { GoArrowRight } from "react-icons/go";

export const HeroSection = () => {
    const { setShowDialog } = DialogLoginStore();

    return (
        <div className={styles.hero_section}>
            <h1>Sistema de Gestão empresarial</h1>
            <p>Gerencie clientes, contratos e cálculos financeiros em um só lugar</p>
            <button onClick={() => setShowDialog(true)} >
                <span>Acessar Sistema</span> 
                <GoArrowRight size={25} />
            </button>
        </div>
    )
}