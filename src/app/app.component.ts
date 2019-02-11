import {Component, OnInit} from '@angular/core';
import {EstadoService} from "./services/estado.service";
import {Estado} from "./model/estado";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ibge-sql';

  listaEstados: Estado[];

  constructor(private estadoService: EstadoService) {

  }

  ngOnInit() {

      this.estadoService.buscarTodos()
          .subscribe(res => {
            this.listaEstados = res;
          })
  }
}
