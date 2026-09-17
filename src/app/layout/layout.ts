import { Component, signal } from '@angular/core';
import { Menu } from './menu/menu';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Sidenav } from './sidenav/sidenav';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    Menu,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    Sidenav,
    MatDivider
  ],
  templateUrl: './layout.html',
  styles: ``,
})
export class Layout {
  isSidenavOpen = signal(false);
  
  toggleSidenav(){
    this.isSidenavOpen.update(v => !v);
  }
}
