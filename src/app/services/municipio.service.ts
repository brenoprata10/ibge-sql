import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../model/estado";
import {environment} from "../../environments/environment";
import {Municipio} from "../model/municipio";

@Injectable()
export class MunicipioService {

    constructor(private httpClient: HttpClient) {

    }

    buscarTodos(): Observable<Municipio[]> {

        return <Observable<Municipio[]>> this.httpClient.get(`${environment.ibgeAPI}/localidades/municipios`);
    }

    gerarScriptCreateTable(nomeSchema:string, nomeTabela: string, nomeTabelaEstado: string): string {

        return `CREATE TABLE IF NOT EXISTS ${nomeSchema}.${nomeTabela} (
                id BIGINT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                cod_estado BIGINT NOT NULL
                  CONSTRAINT fk_${nomeTabela}_${nomeTabelaEstado} 
                    FOREIGN KEY id REFERENCES (${nomeTabelaEstado})
            );`
    }

    gerarScriptInsertTable(listaMunicipios: Municipio[], nomeSchema: string, nomeTabela: string): string {

        const insertTable = `INSERT INTO ${nomeSchema}.${nomeTabela} VALUES `;

        return listaMunicipios.map(municipio => `${insertTable}(${municipio.id}, ${municipio.nome}, ${municipio.microrregiao.mesorregiao.UF.id});`)
            .join('\n');
    }
}