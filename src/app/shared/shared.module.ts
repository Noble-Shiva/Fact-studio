import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeStripComponent } from './components/theme-strip/theme-strip.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { AppthemeService } from './services/apptheme.service';
import { MaterialComponentModule } from '../material-component/material-component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialComponentModule,
    RouterModule
  ],
  providers: [
    AppthemeService,
    AuthService
  ],
  exports: [ThemeStripComponent, NavbarComponent, FooterComponent, RouterModule],
  declarations: [ThemeStripComponent, NavbarComponent, FooterComponent, HomeComponent]
})
export class SharedModule { }
