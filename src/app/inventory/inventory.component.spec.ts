import { ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingModules } from '../common/common.testing'

import { InventoryComponent } from './inventory.component'

describe('InventoryComponent', () => {
  let component: InventoryComponent
  let fixture: ComponentFixture<InventoryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commonTestingModules, InventoryComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InventoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
