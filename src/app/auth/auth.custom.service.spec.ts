import { TestBed } from '@angular/core/testing'

import { CustomAuthService } from './auth.custom.service'

describe('CustomAuthService', () => {
  let service: CustomAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CustomAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
