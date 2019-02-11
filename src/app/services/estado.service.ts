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

        return `CREATE TABLE IF NOT EXISTS ${nomeSchema}.${nomeTabela} (
                id BIGINT PRIMARY KEY,
                sigla VARCHAR(2) NOT NULL,
                nome VARCHAR(100) NOT NULL,
            );`
    }

    gerarScriptInsertTable(listaEstados: Estado[], nomeSchema: string, nomeTabela: string): string {

        const insertTable = `INSERT INTO ${nomeSchema}.${nomeTabela} VALUES `;

        return listaEstados.map(estado => `${insertTable}(${estado.id}, ${estado.sigla}, ${estado.nome});`)
            .join('\n');
    }
}