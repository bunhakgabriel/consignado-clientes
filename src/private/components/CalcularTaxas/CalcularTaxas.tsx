import { useState } from "react";
import styles from "./CalcularTaxas.module.css";
import { IoCalculatorOutline } from "react-icons/io5";

export const CalcularTaxas = () => {
    const [valorContrato, setValorContrato] = useState<number | "">("");
    const [taxa, setTaxa] = useState<number | "">("");
    const comissao = valorContrato && taxa ? (valorContrato * (taxa / 100)).toFixed(2) : "0.00";

    const handleTaxaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseFloat(e.target.value) : "";
        if (value === "" || isNaN(value)) {
            setTaxa("");
        } else {
            setTaxa(Math.min(100, value));
        }
    };

    return (
        <div className={styles.calcular_taxas}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <IoCalculatorOutline className={styles.icon} size={24} />
                    <h2 className={styles.title}>Calculadora de Taxas</h2>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        <span>Valor do Contrato (R$)</span>
                        <div className={styles.inputWrapper}>
                            <span className={styles.currencySymbol}>R$</span>
                            <input
                                type="number"
                                value={valorContrato}
                                onChange={(e) => setValorContrato(e.target.value ? parseFloat(e.target.value) : "")}
                                className={styles.input}
                                placeholder="0,00"
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </label>

                    <label className={styles.label}>
                        <span>Taxa Percentual</span>
                        <div className={styles.inputWrapper}>
                            <span className={styles.currencySymbol}>%</span>
                            <input
                                type="number"
                                value={taxa}
                                onChange={handleTaxaChange}
                                className={styles.input}
                                placeholder="0"
                                step="0.1"
                                min="0"
                                max="100"
                            />
                        </div>
                    </label>
                </div>

                <div className={styles.resultContainer}>
                    <div className={styles.resultHeader}>Valor da Comissão</div>
                    <div className={styles.resultValue}>
                        <span className={styles.currencyIndicator}>R$</span>
                        <span className={styles.amount}>{comissao}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};