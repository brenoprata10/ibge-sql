export class EstadoScript {

    nomeSchema: string;
    nomeTabela: string;
    nomeCampoId: string;
    nomeCampoNome: string;
    nomeCampoSigla: string;

    constructor(nomeSchema = '',
                nomeTabela = 'tab_estado',
                nomeCampoId = 'cod_estado',
                nomeCampoSigla = 'sigla',
                nomeCampoNome = 'nome') {

        this.nomeSchema = nomeSchema;
        this.nomeTabela = nomeTabela;
        this.nomeCampoId = nomeCampoId;
        this.nomeCampoSigla = nomeCampoSigla;
        this.nomeCampoNome = nomeCampoNome;
    }
}
