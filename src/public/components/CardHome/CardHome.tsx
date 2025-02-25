import styles from './CardHome.module.css';

export type CardHomeProps = {
    icon: React.ReactNode;
    titulo: string;
    paragrafo: string;
}

export const CardHome = ({ data }: { data: CardHomeProps }) => {
    return (
        <div className={styles.card_home}>
            <div>{data.icon}</div>
            <h1 className={styles.titulo}>{data.titulo}</h1>
            <p className={styles.paragrafo}>{data.paragrafo}</p>
        </div>
    )
} 