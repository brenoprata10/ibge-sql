import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../model/estado";
import {environment} from "../../environments/environment";
import {Municipio} from "../model/municipio";
import {MunicipioScript} from "../model/municipio-script";

@Injectable()
export class MunicipioService {

    constructor(private httpClient: HttpClient) {

    }

    buscarTodos(): Observable<Municipio[]> {

        return <Observable<Municipio[]>> this.httpClient.get(`${environment.ibgeAPI}/localidades/municipios`);
    }

    gerarScriptCreateTable(municipioScript: MunicipioScript, nomeTabelaEstado: string, nomeColunaIdEstado: string): string {

        return `\nCREATE TABLE IF NOT EXISTS ${municipioScript.nomeSchema ?
            municipioScript.nomeSchema.concat('.') : ''}${municipioScript.nomeTabela} (
                ${municipioScript.nomeCampoId} BIGINT PRIMARY KEY,
                ${municipioScript.nomeCampoNome} VARCHAR(100) NOT NULL,
                ${municipioScript.nomeCampoFKEstado} BIGINT NOT NULL,
                  CONSTRAINT ${municipioScript.nomeFKEstado}
                    FOREIGN KEY (${municipioScript.nomeCampoFKEstado}) REFERENCES ${municipioScript.nomeSchema ?
                        municipioScript.nomeSchema.concat('.') : ''}${nomeTabelaEstado}(${nomeColunaIdEstado})
            );\n`;
    }

    gerarScriptInsertTable(listaMunicipios: Municipio[], municipioScript: MunicipioScript): string {

        const insertTable = `INSERT INTO ${municipioScript.nomeSchema ?
            municipioScript.nomeSchema.concat('.') : ''}${municipioScript.nomeTabela} VALUES `;

        return listaMunicipios.map(municipio => `${insertTable}(${municipio.id}, '${municipio.nome.replace("'", "''")}', ${municipio.microrregiao.mesorregiao.UF.id});`)
            .join('\n');
    }
}