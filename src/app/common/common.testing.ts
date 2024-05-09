import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconTestingModule } from '@angular/material/icon/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { MediaChange } from '@ngbracket/ngx-layout'
import { autoSpyObj } from 'angular-unit-test-helper'
import { Observable, Subscription, of } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'

export const commonTestingProviders: any[] = [
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
]

export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
  MatIconTestingModule,
] as unknown[]

export class MediaObserverFake {
  isActive(_query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    _next?: (value: MediaChange) => void,
    _error?: (error: Error) => void,
    _complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}
