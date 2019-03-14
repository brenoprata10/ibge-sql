import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../model/estado";
import {environment} from "../../environments/environment";
import {EstadoScript} from "../model/estado-script";

@Injectable()
export class EstadoService {

    constructor(private httpClient: HttpClient) {

    }

    buscarTodos(): Observable<Estado[]> {

        return <Observable<Estado[]>> this.httpClient.get(`${environment.ibgeAPI}/localidades/estados`);
    }

    gerarScriptCreateTable(estadoScript: EstadoScript): string {

        return `\nCREATE TABLE IF NOT EXISTS ${estadoScript.nomeSchema ?
            estadoScript.nomeSchema.concat('.') : ''}${estadoScript.nomeTabela} (
                ${estadoScript.nomeCampoId} BIGINT PRIMARY KEY,
                ${estadoScript.nomeCampoSigla} VARCHAR(2) NOT NULL,
                ${estadoScript.nomeCampoNome} VARCHAR(100) NOT NULL
            );\n`;
    }

    gerarScriptInsertTable(listaEstados: Estado[], estadoScript: EstadoScript): string {

        const insertTable = `INSERT INTO ${estadoScript.nomeSchema ?
            estadoScript.nomeSchema.concat('.') : ''}${estadoScript.nomeTabela} VALUES `;

        return listaEstados.map(estado => `${insertTable}(${estado.id}, '${estado.sigla}', '${estado.nome}');`)
            .join('\n');
    }
}