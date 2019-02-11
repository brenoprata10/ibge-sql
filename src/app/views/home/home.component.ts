import {Component, OnInit} from "@angular/core";
import {EstadoService} from "../../services/estado.service";
import {Estado} from "../../model/estado";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MunicipioService} from "../../services/municipio.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({

    selector: 'app-home',

    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    formScript: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private estadoService: EstadoService,
                private snackbarService: SnackbarService,
                private municipioService: MunicipioService) {
    }

    ngOnInit() {

        this.construirForm();
    }

    private construirForm() {

        this.formScript = this.formBuilder.group({
            schema: new FormControl('ibge_schema', Validators.required),
            nomeTabEstado: new FormControl('tab_estado', Validators.required),
            nomeTabMunicipio: new FormControl('tab_municipio', Validators.required)
        });
    }

    gerarScriptGenerico() {

        if (this.formScript.invalid) {

            this.snackbarService.mostrarSnack('Preencha os campos obrigatórios');
            return;
        }

        this.estadoService.buscarTodos()
            .subscribe((listaEstado: Estado[]) => {

                console.log(this.estadoService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabEstado));
                console.log(this.estadoService.gerarScriptInsertTable(listaEstado, this.valorFormSchema, this.valorFormNomeTabEstado));

                this.municipioService.buscarTodos()
                    .subscribe((listaMunicipio => {

                        console.log(this.municipioService.gerarScriptCreateTable(this.valorFormSchema, this.valorFormNomeTabMunicipio, this.valorFormNomeTabEstado));
                        console.log(this.municipioService.gerarScriptInsertTable(listaMunicipio, this.valorFormSchema, this.valorFormNomeTabMunicipio));
                    }));
            }, error => {

            });
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