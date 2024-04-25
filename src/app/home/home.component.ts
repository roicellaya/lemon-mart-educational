import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout'
import { combineLatest } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlexModule, MatButtonModule, RouterLink],
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Limoncu!</span>
      <button mat-raised-button color="primary" (click)="login()">
        Login as Manager
      </button>
    </div>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  login() {
    this.authService.login('manager@test.com', '12345678')
    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
