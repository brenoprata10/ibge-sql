import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) {}

    mostrarSnack(mensagem: string, action?: string, callBackAction?: Function, duracao = 2000) {

        this.snackBar.open(mensagem, action, {
            duration: duracao,
            verticalPosition: "top",
            horizontalPosition: "right"
        }).onAction().subscribe(res => {
            callBackAction(res);
        });
    }
}