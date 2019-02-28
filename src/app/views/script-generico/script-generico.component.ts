import {Component, OnInit, Renderer2, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCard} from "@angular/material";
import {EstadoService} from "../../services/estado.service";
import {MunicipioService} from "../../services/municipio.service";
import {Estado} from "../../model/estado";
import {SnackbarService} from "../../services/snackbar.service";
import {Municipio} from "../../model/municipio";

@Component({
    selector: 'app-script-generico',

    templateUrl: './script-generico.component.html',

    styleUrls: ['./script-generico.component.scss']
})
export class ScriptGenericoComponent implements OnInit {

    @ViewChild('cardGenerico') cardGenerico: MatCard;

    formScript: FormGroup;

    scriptExemplo: string;

    isScriptGenericoSendoGerado: boolean;

    constructor(private renderer: Renderer2,
                private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private snackbarService: SnackbarService,
                private municipioService: MunicipioService) {}

    ngOnInit() {

        this.construirForm();
        this.atualizarScriptExemplo();
    }

    gerarScriptGenerico() {

        if (this.formScript.invalid) {

            this.snackbarService.mostrarSnack('Preencha os campos obrigatórios');
            return;
        }

        this.isScriptGenericoSendoGerado = true;
        this.adicionarOpacidadeCard(document.getElementById('card-generico'));

        this.gerarScriptEstadoMunicipio();
    }

    atualizarScriptExemplo() {

        this.scriptExemplo = this.estadoService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabEstado)
    }

    private construirForm() {

        this.formScript = this.formBuilder.group({
            schema: new FormControl('ibge_schema'),
            nomeTabEstado: new FormControl('tab_estado', Validators.required),
            nomeTabMunicipio: new FormControl('tab_municipio', Validators.required)
        });
    }

    private adicionarOpacidadeCard(element) {

        this.renderer.addClass(element, 'card-loading');
    }

    private esconderLoading(element) {

        this.renderer.removeClass(element, 'card-loading');
    }

    private downloadArquivo(script) {

        const link: any = document.createElement("a");
        link.download = 'script-ibge.sql';
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(script)}`;
        link.click();
    }

    private gerarScriptEstadoMunicipio() {

        this.estadoService.buscarTodos()
            .subscribe((listaEstado: Estado[]) => {

                let scriptGerado = this.gerarScriptEstado(listaEstado);

                this.municipioService.buscarTodos()
                    .subscribe((listaMunicipio => {

                        scriptGerado = scriptGerado.concat(this.gerarScriptMunicipio(listaMunicipio));

                        this.finalizarOperacao(scriptGerado);
                    }));
            }, () => {

                this.tratarErroAPI();
            });
    }

    private finalizarOperacao(scriptGerado: string) {

        this.downloadArquivo(scriptGerado);

        this.isScriptGenericoSendoGerado = false;
        this.esconderLoading(document.getElementById('card-generico'));
    }

    private gerarScriptEstado(listaEstado: Estado[]): string {

        const scriptGerado = this.estadoService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabEstado);

        return scriptGerado.concat(this.estadoService.gerarScriptInsertTable(listaEstado, this.valorFormSchema, this.valorFormNomeTabEstado));
    }

    private gerarScriptMunicipio(listaMunicipio: Municipio[]): string {

        const scriptGerado = this.municipioService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabMunicipio, this.valorFormNomeTabEstado);

        return scriptGerado.concat(this.municipioService.gerarScriptInsertTable(listaMunicipio, this.valorFormSchema, this.valorFormNomeTabMunicipio));
    }

    private tratarErroAPI() {

        this.snackbarService.mostrarSnack('O IBGE não está respondendo!', 'Tentar novamente', () => {

            this.gerarScriptGenerico();
        }, 7000);

        this.isScriptGenericoSendoGerado = false;
        this.esconderLoading(document.getElementById('card-generico'));
    }

    get valorFormSchema(): string {

        return this.formScript.get('schema').value;
    }

    get valorFormNomeTabEstado(): string {

        return this.formScript.get('nomeTabEstado').value;
    }

    get valorFormNomeTabMunicipio(): string {

        return this.formScript.get('nomeTabMunicipio').value;
    }

}