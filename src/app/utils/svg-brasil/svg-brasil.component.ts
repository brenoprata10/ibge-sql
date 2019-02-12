import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-svg-brasil',

    templateUrl: './svg-brasil.component.html',

    styleUrls: ['./svg-brasil.component.scss']
})
export class SvgBrasilComponent {

    @Input('width') width: number;
    @Input('height') height: number;
    @Input('corPrincipal') corPrincipal: string;
}