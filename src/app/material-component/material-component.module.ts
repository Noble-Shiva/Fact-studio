import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule, MatListModule, MatSidenavModule, MatAutocompleteModule } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSelectModule
  ],
  exports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class MaterialComponentModule { }
