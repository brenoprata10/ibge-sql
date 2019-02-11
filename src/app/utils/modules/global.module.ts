import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./angular-material.module";
import {HttpClientModule} from "@angular/common/http";
import {EstadoService} from "../../services/estado.service";
import {SvgBrasilComponent} from "../svg-brasil/svg-brasil.component";
import {MunicipioService} from "../../services/municipio.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SnackbarService} from "../../services/snackbar.service";

@NgModule({
    exports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        BrowserAnimationsModule,

        SvgBrasilComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
    ],
    declarations: [

        SvgBrasilComponent,
    ],
    providers: [
        EstadoService,
        SnackbarService,
        MunicipioService,
    ]
})
export class GlobalModule {

}