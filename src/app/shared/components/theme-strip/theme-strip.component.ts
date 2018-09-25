import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppthemeService } from '../../services/apptheme.service';

@Component({
  selector: 'app-theme-strip',
  templateUrl: './theme-strip.component.html',
  styleUrls: ['./theme-strip.component.scss']
})
export class ThemeStripComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: AppthemeService) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
