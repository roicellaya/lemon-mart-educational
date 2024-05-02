import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterLink } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout'
import { combineLatest } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

import { AuthService } from '../auth/auth.service'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlexModule, MatButtonModule, RouterLink, LoginComponent],
  template: `
    @if (displayLogin) {
      <app-login></app-login>
    } @else {
      <span class="mat-display-3">
        You get a lemon, you get a lemon, you get a lemon...
      </span>
    }
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
  displayLogin = true

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
