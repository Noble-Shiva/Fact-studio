import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactDashboardComponent } from './fact-dashboard/fact-dashboard.component';
import { FactListComponent } from './fact-list/fact-list.component';
import { FactDetailComponent } from './fact-detail/fact-detail.component';
import { MaterialComponentModule } from '../material-component/material-component.module';
import { FactsService } from './facts.service';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'blog', component: FactListComponent },
  { path: 'blog/:id', component: FactDetailComponent },
  { path: 'dashboard', component: FactDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialComponentModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [FactDashboardComponent, FactListComponent, FactDetailComponent],
  providers: [FactsService]
})
export class FactsModule { }
