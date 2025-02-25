type Contato = {
    telefone1: string;
    telefone2?: string;
    telefone3?: string;
}

type Rg = {
    numero: string;
    dataEmissao: Date;
    orgaoEmissor: string;
}

export class Cliente {
    idUsuario?: string; 
    cpf: string;
    nomeCompleto: string
    contato: Contato
    convenio: string;
    banco: string;
    sexo: string;
    dataNascimento: Date;
    email: string;
    rg: Rg
    endereco: string;
    observacoes: string;

    constructor() {
        this.cpf = '';
        this.nomeCompleto = '';
        this.contato = {
            telefone1: '',
            telefone2: '',
            telefone3: '',
        };
        this.convenio = '';
        this.banco = '';
        this.sexo = '';
        this.dataNascimento = new Date();
        this.email = '';
        this.rg = {
            numero: '',
            dataEmissao: new Date(),
            orgaoEmissor: ''
        };
        this.endereco = '';
        this.observacoes = '';
    }
}
