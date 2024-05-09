import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthService } from '../../auth/auth.service'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { LogoutComponent } from './logout.component'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...commonTestingModules, LogoutComponent],
      providers: [AuthService],
      declarations: [],
    }).compileComponents()

    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
