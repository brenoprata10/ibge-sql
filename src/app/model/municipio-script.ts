export class MunicipioScript {

    nomeSchema: string;
    nomeTabela: string;
    nomeCampoId: string;
    nomeCampoNome: string;
    nomeCampoFKEstado: string;
    nomeFKEstado: string;

    constructor(nomeSchema = '',
                nomeTabela = 'tab_municipio',
                nomeCampoId = 'cod_municipio',
                nomeCampoFKEstado = 'cod_estado',
                nomeFKEstado = 'fk_tab_municipio_tab_estado',
                nomeCampoNome = 'nome') {

        this.nomeSchema = nomeSchema;
        this.nomeTabela = nomeTabela;
        this.nomeCampoId = nomeCampoId;
        this.nomeFKEstado = nomeFKEstado;
        this.nomeCampoNome = nomeCampoNome;
        this.nomeCampoFKEstado = nomeCampoFKEstado;
    }
}
