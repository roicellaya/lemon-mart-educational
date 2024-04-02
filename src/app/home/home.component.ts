import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { FlexModule } from '@ngbracket/ngx-layout'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlexModule, MatButtonModule],
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Limoncu!</span>
      <button mat-raised-button color="primary">Login</button>
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
export class HomeComponent {}
