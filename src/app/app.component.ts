import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  redirecionarPara(link: string) {

      window.open(link);
  }

  moverScrollParaElemento() {

      setTimeout(() => {
          window.scroll({
              top: window.scrollY + document.getElementById('cards-sql').getBoundingClientRect().top - 75,
              behavior: 'smooth'
          });
      }, 100);
  }
}
