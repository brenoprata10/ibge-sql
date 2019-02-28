import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GlobalModule} from "./utils/modules/global.module";
import {HomeComponent} from "./views/home/home.component";
import {GithubRibbonComponent} from "./utils/github-ribbon/github-ribbon.component";
import {ScriptGenericoComponent} from "./views/script-generico/script-generico.component";
import {ScriptAvancadoComponent} from "./views/script-avancado/script-avancado.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        GithubRibbonComponent,
        ScriptAvancadoComponent,
        ScriptGenericoComponent,
    ],
    imports: [
        GlobalModule,
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
