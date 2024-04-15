import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { DomSanitizer } from '@angular/platform-browser'
import { RouterLink, RouterOutlet } from '@angular/router'
import { FlexLayoutModule, FlexModule } from '@ngbracket/ngx-layout'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px" class="app-toolbar">
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>

      <a mat-icon-button routerLink="/home">
        <mat-icon svgIcon="lemon"></mat-icon>
        <span class="left-pad" data-testid="title">LemonMartOwn</span>
      </a>
      <span class="flex-spacer"></span>
      <button
        mat-mini-fab
        routerLink="/user/profile"
        matTooltip="Profile"
        aria-label="User Profile"
      >
        <mat-icon>account_circle</mat-icon>
      </button>
      <button
        mat-mini-fab
        routerLink="/user/logout"
        matTooltip="Logout"
        aria-label="Logout"
      >
        <mat-icon>lock_open</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }
}
