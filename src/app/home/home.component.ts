import { AsyncPipe } from '@angular/common'
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
  imports: [FlexModule, MatButtonModule, RouterLink, LoginComponent, AsyncPipe],
  template: `
    @if ((authService.authStatus$ | async)?.isAuthenticated) {
      <div>
        <div class="mat-display-4">This is LemonMart! The place where</div>
        <div class="mat-display-4">
          You get a lemon, you get a lemon, you get a lemon...
        </div>
        <div class="mat-display-4">Everybody gets a lemon.</div>
      </div>
    } @else {
      <app-login></app-login>
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
  constructor(
    public authService: AuthService,
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
