import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ReceiptLookupComponent } from './receipt-lookup.component'

describe('ReceiptLookupComponent', () => {
  let component: ReceiptLookupComponent
  let fixture: ComponentFixture<ReceiptLookupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptLookupComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ReceiptLookupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
