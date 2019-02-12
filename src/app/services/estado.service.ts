import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../model/estado";
import {environment} from "../../environments/environment";

@Injectable()
export class EstadoService {

    constructor(private httpClient: HttpClient) {

    }

    buscarTodos(): Observable<Estado[]> {

        return <Observable<Estado[]>> this.httpClient.get(`${environment.ibgeAPI}/localidades/estados`);
    }

    gerarScriptCreateTable(nomeSchema:string, nomeTabela: string): string {

        return `\nCREATE TABLE IF NOT EXISTS ${nomeSchema ? nomeSchema.concat('.') : ''}${nomeTabela} (
                cod_estado BIGINT PRIMARY KEY,
                sigla VARCHAR(2) NOT NULL,
                nome VARCHAR(100) NOT NULL
            );\n`
    }

    gerarScriptInsertTable(listaEstados: Estado[], nomeSchema: string, nomeTabela: string): string {

        const insertTable = `INSERT INTO ${nomeSchema ? nomeSchema.concat('.') : ''}${nomeTabela} VALUES `;

        return listaEstados.map(estado => `${insertTable}(${estado.id}, '${estado.sigla}', '${estado.nome}');`)
            .join('\n');
    }
}