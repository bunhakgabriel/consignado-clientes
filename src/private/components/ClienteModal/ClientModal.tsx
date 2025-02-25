import React from 'react';
import { Cliente } from '../../../models/Cliente';
import styles from './ClientModal.module.css';
import { IoMdClose } from 'react-icons/io';
import { FaPrint } from 'react-icons/fa6';

interface ClientModalProps {
    client: Cliente;
    onClose: () => void;
}

const formatDate = (date: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
};

const ClientModal: React.FC<ClientModalProps> = ({ client, onClose }) => {

    const print = () => {
        const modalContent = document.querySelector(`.${styles.modal}`); // Seleciona apenas o modal
        if (!modalContent) return;
    
        const clonedContent = modalContent.cloneNode(true) as HTMLElement;
    
        // Remove a div.buttons do conteúdo clonado
        const buttons = clonedContent.querySelector(`.${styles.buttons}`);
        if (buttons) buttons.remove();
    
        // Abre uma nova janela para imprimir
        const printWindow = window.open('', '', 'width=800,height=600');
        if (!printWindow) return;
    
        printWindow.document.open();
        printWindow.document.write(`
            <html>
                <head>
                    <title>Impressão</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2, h3 { color: #333; }
                        .${styles.modal} { width: 100%; max-width: 600px; margin: auto; }
                    </style>
                </head>
                <body>
                    ${clonedContent.outerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };    

    const renderField = (label: string, value: any) => {
        if (value === null || value === undefined || value === '') return null;
        return (
            <div className={styles.field}>
                <span className={styles.label}>{label}:</span>
                <span className={styles.value}>{value}</span>
            </div>
        );
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.buttons}>
                    <FaPrint className={styles.close} size={20} onClick={() => print()} />
                    <IoMdClose className={styles.impressao} size={26} onClick={onClose} />
                </div>

                <h2 className={styles.title}>Informações do Cliente</h2>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Dados Pessoais</h3>
                    {renderField('Nome Completo', client.nomeCompleto)}
                    {renderField('CPF', client.cpf)}
                    {renderField('Sexo', client.sexo)}
                    {renderField('Data de Nascimento', formatDate(client.dataNascimento))}
                    {renderField('Email', client.email)}
                </div>

                {(client.rg?.numero || client.rg?.dataEmissao || client.rg?.orgaoEmissor) && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>RG</h3>
                        {renderField('Número', client.rg.numero)}
                        {renderField('Data de Emissão', formatDate(client.rg.dataEmissao))}
                        {renderField('Órgão Emissor', client.rg.orgaoEmissor)}
                    </div>
                )}

                {(client.contato?.telefone1 || client.contato?.telefone2 || client.contato?.telefone3) && (
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Contato</h3>
                        {renderField('Telefone 1', client.contato.telefone1)}
                        {renderField('Telefone 2', client.contato.telefone2)}
                        {renderField('Telefone 3', client.contato.telefone3)}
                    </div>
                )}

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Informações Adicionais</h3>
                    {renderField('Endereço', client.endereco)}
                    {renderField('Convênio', client.convenio)}
                    {renderField('Banco', client.banco)}
                    {renderField('Observações', client.observacoes)}
                </div>
            </div>
        </div>
    );
};

export default ClientModal;