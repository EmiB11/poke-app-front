import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MOdulos exportados de Angular Material
import{MatButtonModule} from '@angular/material/button'
import{MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
    MatSliderModule,
    MatSelectModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }