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

        return `\nCREATE TABLE IF NOT EXISTS ${nomeSchema ? nomeSchema.concat('.') : ''}${nomeTabela} (
                cod_municipio BIGINT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                cod_estado BIGINT NOT NULL,
                  CONSTRAINT fk_${nomeTabela}_${nomeTabelaEstado} 
                    FOREIGN KEY (cod_estado) REFERENCES ${nomeSchema ? nomeSchema.concat('.') : ''}${nomeTabelaEstado}(cod_estado)
            );\n`
    }

    gerarScriptInsertTable(listaMunicipios: Municipio[], nomeSchema: string, nomeTabela: string): string {

        const insertTable = `INSERT INTO ${nomeSchema ? nomeSchema.concat('.') : ''}${nomeTabela} VALUES `;

        return listaMunicipios.map(municipio => `${insertTable}(${municipio.id}, '${municipio.nome.replace("'", "''")}', ${municipio.microrregiao.mesorregiao.UF.id});`)
            .join('\n');
    }
}