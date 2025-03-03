import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styles from './GridClientes.module.css';
import { UsuarioStore } from '../../../store/idUsuario';
import { Cliente } from '../../../models/Cliente';
import { IoIosSearch } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';
import ClientModal from '../ClienteModal/ClientModal';
import { FaRegEye } from 'react-icons/fa6';
import { Formulario } from '../Formulario/Formulario';
import useCliente from '../../hooks/cliente';

interface ActionButtonsProps extends ICellRendererParams {
    onViewClient: (client: Cliente) => void;
    onEditClient: (client: Cliente) => void;
}

const ActionButtons = (props: ActionButtonsProps) => {
    const { delet } = useCliente();

    const onView = () => {
        props.onViewClient(props.data);
    };

    const onDelete = async () => {
        try {
            if(!window.confirm('Deseja deletar esse cliente? Essa ação não pode ser desfeita.')) return
            await delet(props.data);
            window.location.reload();
        } catch (e) {
            alert('Erro ao deletar cliente! Tente novamente.')
            console.log(e);
        }
    };

    const onEdit = () => {
        props.onEditClient(props.data);
    }

    return (
        <div className={styles.actionButtons}>
            <button
                onClick={onView}
                className={styles.actionButton}
                title="View Details"
            >
                <FaRegEye size={18} />
            </button>
            <button
                onClick={onDelete}
                className={styles.actionButton}
                title="Delete"
            >
                <MdDelete size={18} />
            </button>
            <button
                onClick={onEdit}
                className={styles.actionButton}
                title="Edit"
            >
                <MdEdit size={18} />
            </button>
        </div>
    );
};

const DataGrid: React.FC = () => {
    const [gridApi, setGridApi] = useState<any>(null);
    const [searchText, setSearchText] = useState('');
    const [rowData, setRowData] = useState<Cliente[]>([]);
    const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
    const [editClient, setEditClient] = useState<Cliente | null>(null);

    const { idUsuario } = UsuarioStore();
    const { get } = useCliente();

    useEffect(() => {
        const fetchClientes = async () => {
            const id = idUsuario || JSON.parse(localStorage.getItem("idUsuario") || '');
            const data: Cliente[] = await get(id);
            setRowData(data);
        }
        fetchClientes();
    }, [])

    const columnDefs: ColDef[] = [
        { field: 'nomeCompleto', headerName: 'Nome', sortable: true, filter: true },
        { field: 'cpf', headerName: 'CPF', sortable: true, filter: true },
        { field: 'sexo', headerName: 'Sexo', sortable: true, filter: true },
        { field: 'dataNascimento', headerName: 'Data de Nascimento', sortable: true, filter: true },
        {
            headerName: 'Actions',
            cellRenderer: ActionButtons,
            cellRendererParams: {
                onViewClient: (client: Cliente) => setSelectedClient(client),
                onEditClient: (client: Cliente) => setEditClient(client)
            },
            sortable: false,
            filter: false,
            width: 120,
        },
    ];

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 150,
        resizable: true,
    }), []);

    const onGridReady = useCallback((params: any) => {
        setGridApi(params.api);
    }, []);

    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);

        if (gridApi) {
            gridApi.onFilterChanged();
        }
    }, [gridApi]);

    const paginationPageSize = 9;

    const isExternalFilterPresent = useCallback(() => {
        return searchText !== '';
    }, [searchText]);

    const doesExternalFilterPass = useCallback((node: any) => {
        if (searchText === '') return true;

        const searchValue = searchText.toLowerCase();
        const nomeCompleto = (node.data.nomeCompleto || '').toLowerCase();
        const cpf = (node.data.cpf || '').toLowerCase();

        return nomeCompleto.includes(searchValue) || cpf.includes(searchValue);
    }, [searchText]);

    return (
        <div>
            <div className={styles.searchContainer}>
                <IoIosSearch size={20} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar por Nome ou Cpf..."
                    value={searchText}
                    onChange={onSearchChange}
                />
            </div>

            <div className={`ag-theme-alpine ${styles.gridContainer}`}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    animateRows={true}
                    isExternalFilterPresent={isExternalFilterPresent}
                    doesExternalFilterPass={doesExternalFilterPass}
                />
            </div>

            {selectedClient && (
                <ClientModal
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                />
            )}

            {editClient && (
                <div className={styles.editar_cliente}>
                    <Formulario
                        editar={true}
                        cancelar={setEditClient}
                        cliente={editClient}
                    />
                </div>
            )}

        </div>
    );
};

const GridClientes = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.gridWrapper}>
                    <DataGrid />
                </div>
            </div>
        </div>
    );
}

export default GridClientes;