import { ComponentFixture, TestBed } from '@angular/core/testing'

import { commonTestingModules } from '../common/common.testing'
import { ManagerComponent } from './manager.component'

describe('ManagerComponent', () => {
  let component: ManagerComponent
  let fixture: ComponentFixture<ManagerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commonTestingModules, ManagerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
