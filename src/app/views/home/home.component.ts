import {Component, OnInit, Renderer2, ViewChild} from "@angular/core";
import {EstadoService} from "../../services/estado.service";
import {Estado} from "../../model/estado";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MunicipioService} from "../../services/municipio.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MatCard} from "@angular/material";

@Component({

    selector: 'app-home',

    templateUrl: './home.component.html',

    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('cardGenerico') cardGenerico: MatCard;

    scriptExemplo: string;
    formScript: FormGroup;

    isScriptGenericoSendoGerado: boolean;

    constructor(private renderer: Renderer2,
                private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private snackbarService: SnackbarService,
                private municipioService: MunicipioService) {
    }

    ngOnInit() {

        this.construirForm();
        this.atualizarScriptExemplo();
    }

    private construirForm() {

        this.formScript = this.formBuilder.group({
            schema: new FormControl('ibge_schema'),
            nomeTabEstado: new FormControl('tab_estado', Validators.required),
            nomeTabMunicipio: new FormControl('tab_municipio', Validators.required)
        });
    }

    gerarScriptGenerico() {

        if (this.formScript.invalid) {

            this.snackbarService.mostrarSnack('Preencha os campos obrigatórios');
            return;
        }

        this.isScriptGenericoSendoGerado = true;
        this.adicionarOpacidadeCard(document.getElementById('card-generico'));

        this.estadoService.buscarTodos()
            .subscribe((listaEstado: Estado[]) => {

                let scriptGerado = '';

                scriptGerado = this.estadoService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabEstado);
                scriptGerado = scriptGerado.concat(this.estadoService.gerarScriptInsertTable(listaEstado, this.valorFormSchema, this.valorFormNomeTabEstado));

                this.municipioService.buscarTodos()
                    .subscribe((listaMunicipio => {

                        scriptGerado = scriptGerado.concat(this.municipioService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabMunicipio, this.valorFormNomeTabEstado));
                        scriptGerado = scriptGerado.concat(this.municipioService.gerarScriptInsertTable(listaMunicipio, this.valorFormSchema, this.valorFormNomeTabMunicipio));

                        this.downloadArquivo(scriptGerado);

                        this.isScriptGenericoSendoGerado = false;
                        this.esconderLoading(document.getElementById('card-generico'));
                    }));
            }, () => {

                this.snackbarService.mostrarSnack('O IBGE não está respondendo!', 'Tentar novamente', () => {

                    this.gerarScriptGenerico();
                }, 7000);

                this.isScriptGenericoSendoGerado = false;
                this.esconderLoading(document.getElementById('card-generico'));
            });
    }

    adicionarOpacidadeCard(element) {

        this.renderer.addClass(element, 'card-loading');
    }

    esconderLoading(element) {

        this.renderer.removeClass(element, 'card-loading');
    }

    downloadArquivo(script) {

        const link: any = document.createElement("a");
        link.download = 'teste.sql';
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(script)}`;
        link.click();
    }

    atualizarScriptExemplo() {

        this.scriptExemplo = this.estadoService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabEstado)
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