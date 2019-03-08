import {Component, OnInit, Renderer2} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EstadoService} from "../../services/estado.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MunicipioService} from "../../services/municipio.service";

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

    constructor(private renderer: Renderer2,
                private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private snackbarService: SnackbarService,
                private municipioService: MunicipioService) {
    }

    ngOnInit() {

        this.inicializarVariaveis();
        this.construirForm();
        console.log(this.formScript.get('estado'));
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
                nomeCampoFKEstado: new FormControl('fk_tab_municipio_tab_estado', Validators.required),
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