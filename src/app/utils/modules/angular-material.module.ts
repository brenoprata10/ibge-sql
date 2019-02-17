import {NgModule} from "@angular/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule, MatStepperModule} from "@angular/material";

@NgModule({
    exports: [
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        MatSnackBarModule,
        MatGridListModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
    ],
    imports: [
        MatCardModule,
        MatRadioModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        MatStepperModule,
        MatDividerModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatGridListModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule,
    ],
    declarations: [

    ]
})
export class AngularMaterialModule {

}