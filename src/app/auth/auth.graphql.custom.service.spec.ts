import { TestBed } from '@angular/core/testing'

import { CustomGraphQLAuthService } from './auth.graphql.custom.service'

describe('CustomGraphQLAuthService', () => {
  let service: CustomGraphQLAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CustomGraphQLAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
