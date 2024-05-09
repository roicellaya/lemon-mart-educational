import { TestBed } from '@angular/core/testing'
import { MediaObserver } from '@ngbracket/ngx-layout'

import { AppComponent } from './app.component'
import { AuthService } from './auth/auth.service'
import { MediaObserverFake, commonTestingModules } from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonTestingModules],
      providers: [{ provide: MediaObserver, useClass: MediaObserverFake }, AuthService],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
