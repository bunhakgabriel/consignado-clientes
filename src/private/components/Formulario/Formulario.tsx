import { useForm } from 'react-hook-form';
import { Cliente } from '../../../models/Cliente';
import styles from './Formulario.module.css';
import { postCliente, updateCliente } from '../../service/cliente';
import { UsuarioStore } from '../../../store/idUsuario';

type propsFormulario = {
    editar?: boolean;
    cliente?: Cliente;
    cancelar?: any;
}

export const Formulario = ({ editar, cliente, cancelar }: propsFormulario) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Cliente>({
        defaultValues: editar ? cliente : undefined
    });
    const { idUsuario } = UsuarioStore();
    const messageError = 'Campo obrigatório';

    const onSubmit = async (data: Cliente) => {
        if (!idUsuario) return;
        data.idUsuario = idUsuario;
        try {
            if(editar){
                await updateCliente(data);
                window.location.reload();
            } else {
                await postCliente(data, reset);
            }
        } catch (e) {
            alert('Erro ao cadastrar cliente, aguarde e tente novamente.');
            console.log(e);
        }
    };

    return (
        <div className={`${styles.formulario} ${editar ? styles.edit_form  : ''}`}>
            <div className={styles.container}>

                {!editar && (
                    <div className={styles.sectionTitle}>
                        <h3>INFORMAÇÕES BÁSICAS DO CLIENTE</h3>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.container_form}>
                        <div className={styles.duas_colunas}>
                            <div className={styles.container_input}>
                                <label>CPF*</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    {...register('cpf', { required: true })}
                                    disabled={editar ? true : false}
                                />
                                {errors.cpf && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>NOME COMPLETO*</label>
                                <input className={styles.input} type="text" {...register('nomeCompleto', { required: true })} />
                                {errors.nomeCompleto && <span className={styles.error}>{messageError}</span>}
                            </div>
                        </div>

                        <div className={styles.tres_colunas}>
                            <div className={styles.container_input}>
                                <label>TELEFONE 1*</label>
                                <input className={styles.input} type="tel" {...register('contato.telefone1', { required: true })} />
                                {errors.contato?.telefone1 && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>TELEFONE 2</label>
                                <input className={styles.input} type="tel" {...register('contato.telefone2')} />
                            </div>
                            <div className={styles.container_input}>
                                <label>TELEFONE 3</label>
                                <input className={styles.input} type="tel" {...register('contato.telefone3')} />
                            </div>
                        </div>

                        <div className={styles.duas_colunas}>
                            <div className={styles.container_input}>
                                <label>CONVÊNIO</label>
                                <select className={styles.select} {...register('convenio', { required: true })}>
                                    <option value="">Selecione</option>
                                    <option value="INSS">INSS</option>
                                    <option value="SIAP">SIAP</option>
                                </select>
                                {errors.convenio && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>BANCO</label>
                                <input className={styles.input} type="text" {...register('banco', { required: true })} />
                                {errors.banco && <span className={styles.error}>{messageError}</span>}
                            </div>
                        </div>

                        <div className={styles.tres_colunas}>
                            <div className={styles.container_input}>
                                <label>SEXO</label>
                                <select className={styles.select} {...register('sexo', { required: true })}>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                                {errors.sexo && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>DATA NASCIMENTO</label>
                                <input className={styles.input} type="date" {...register('dataNascimento', { required: true })} />
                                {errors.dataNascimento && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>EMAIL</label>
                                <input className={styles.input} type="email" {...register('email', { required: true })} />
                                {errors.email && <span className={styles.error}>{messageError}</span>}
                            </div>
                        </div>

                        <div className={styles.tres_colunas}>
                            <div className={styles.container_input}>
                                <label>RG Nº</label>
                                <input className={styles.input} type="text" {...register('rg.numero', { required: true })} />
                                {errors.rg?.numero && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>DATA EMISSÃO</label>
                                <input className={styles.input} type="date" {...register('rg.dataEmissao', { required: true })} />
                                {errors.rg?.dataEmissao && <span className={styles.error}>{messageError}</span>}
                            </div>
                            <div className={styles.container_input}>
                                <label>ÓRGÃO EMISSOR</label>
                                <input className={styles.input} type="text" {...register('rg.orgaoEmissor')} />
                            </div>
                        </div>

                        <div className={styles.uma_coluna}>
                            <div className={styles.container_input}>
                                <label>ENDEREÇO</label>
                                <input className={styles.input} type="text" {...register('endereco')} />
                            </div>
                        </div>

                        <div className={styles.uma_coluna}>
                            <div className={styles.container_input}>
                                <label>OBSERVAÇÕES</label>
                                <textarea {...register('observacoes')} rows={4} className={styles.text_area} />
                            </div>
                        </div>
                    </div>


                    <div className={styles.buttons}>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.resetForm}`}
                            onClick={() => editar ? cancelar(null) : reset()}
                        >
                            {!editar ? 'Limpar Campos' : 'Cancelar'}
                        </button>
                        <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
