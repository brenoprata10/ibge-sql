import {Component, OnInit, Renderer2} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EstadoService} from "../../services/estado.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MunicipioService} from "../../services/municipio.service";
import {Estado} from "../../model/estado";
import {Municipio} from "../../model/municipio";

@Component({

    selector: 'app-script-avancado',

    templateUrl: './script-avancado.component.html',

    styleUrls: ['./script-avancado.component.scss']
})
export class ScriptAvancadoComponent implements OnInit {

    private MYSQL = {
        nome: 'Mysql',
        icon: '../assets/images/logo-mysql-170x115.png'
    };
    private POSTGRES = {
        nome: 'Postgres',
        icon: '../assets/images/images.png'
    };

    step = -1;

    formScript: FormGroup;

    listaBancosSuportados: any[];

    isScriptSendoGerado: boolean;

    constructor(private renderer: Renderer2,
                private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private snackbarService: SnackbarService,
                private municipioService: MunicipioService) {
    }

    ngOnInit() {

        this.inicializarVariaveis();
        this.construirForm();
    }

    gerarScript() {


        if (this.formScript.invalid) {

            this.snackbarService.mostrarSnack('Preencha os campos obrigatórios');
            return;
        }

        this.isScriptSendoGerado = true;
        this.adicionarOpacidadeCard(document.getElementById('card-avancado'));

        this.gerarScriptEstadoMunicipio();
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

    private gerarScriptEstado(listaEstado: Estado[]): string {

        const estadoScript  = this.formEstado.value;
        estadoScript.nomeSchema = this.formScript.get('dadosScript').get('schema').value;

        const scriptGerado = this.estadoService.gerarScriptCreateTable(estadoScript);

        return scriptGerado.concat(this.estadoService.gerarScriptInsertTable(listaEstado, estadoScript));
    }

    private gerarScriptMunicipio(listaMunicipio: Municipio[]): string {

        const municipioScript  = this.formMunicipio.value;
        municipioScript.nomeSchema = this.formScript.get('dadosScript').get('schema').value;

        const nomeTabelaEstado = this.formEstado.get('nomeTabela').value;
        const nomeCampoIdEstado = this.formEstado.get('nomeCampoId').value;

        const scriptGerado = this.municipioService.gerarScriptCreateTable(municipioScript, nomeTabelaEstado, nomeCampoIdEstado);

        return scriptGerado.concat(this.municipioService.gerarScriptInsertTable(listaMunicipio, municipioScript));
    }

    private tratarErroAPI() {

        this.snackbarService.mostrarSnack('O IBGE não está respondendo!', 'Tentar novamente', () => {

            this.gerarScript();
        }, 7000);

        this.isScriptSendoGerado = false;
        this.esconderLoading(document.getElementById('card-avancado'));
    }

    private finalizarOperacao(scriptGerado: string) {

        this.downloadArquivo(scriptGerado);

        this.isScriptSendoGerado = false;
        this.esconderLoading(document.getElementById('card-avancado'));
    }

    private downloadArquivo(script) {

        const link: any = document.createElement("a");
        link.download = 'script-ibge.sql';
        link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(script)}`;
        link.click();
    }

    private construirForm() {

        this.formScript = this.formBuilder.group(Object.assign({},
            this.construirFormTipoBanco(),
            this.construirFormDadosScript()));
    }

    private construirFormTipoBanco() {

        return {
            tipoBanco: new FormGroup({

                nome: new FormControl(null, Validators.required)
            }, Validators.required)
        };
    }

    private construirFormDadosScript() {

        return {
            dadosScript: new FormGroup(Object.assign({},
                this.construirFormEstado(),
                this.construirFormMunicipio(),
                this.construirFormDadosBasicos()),
                Validators.required)
        };
    }

    private construirFormEstado() {

        return {
            estado: new FormGroup({

                nomeTabela: new FormControl('tab_estado', Validators.required),
                nomeCampoNome: new FormControl('nome', Validators.required),
                nomeCampoSigla: new FormControl('sigla', Validators.required),
                nomeCampoId: new FormControl('cod_estado', Validators.required),
            }, Validators.required),
        };
    }

    private construirFormMunicipio() {

        return {
            municipio: new FormGroup({

                nomeCampoNome: new FormControl('nome', Validators.required),
                nomeTabela: new FormControl('tab_municipio', Validators.required),
                nomeCampoId: new FormControl('cod_municipio', Validators.required),
                nomeCampoFKEstado: new FormControl('cod_estado', Validators.required),
                nomeFKEstado: new FormControl('fk_tab_municipio_tab_estado', Validators.required),
            }, Validators.required)
        };
    }

    private construirFormDadosBasicos() {

        return {
            schema: new FormControl('ibge_schema')
        };
    }

    private inicializarVariaveis() {

        this.listaBancosSuportados = [this.MYSQL, this.POSTGRES];
    }

    private esconderLoading(element) {

        this.renderer.removeClass(element, 'card-loading');
    }

    private adicionarOpacidadeCard(element) {

        this.renderer.addClass(element, 'card-loading');
    }

    get formTipoBanco(): FormGroup {

        return this.formScript.get('tipoBanco') as FormGroup;
    }

    get formDadosScript(): FormGroup {

        return this.formScript.get('dadosScript') as FormGroup;
    }

    get formEstado(): FormGroup {

        return this.formDadosScript.get('estado') as FormGroup;
    }

    get formMunicipio(): FormGroup {

        return this.formDadosScript.get('municipio') as FormGroup;
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }
}