import { HttpInterceptorFn } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { AuthHttpInterceptor } from './auth.http.interceptor'

describe('AuthHttpInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => AuthHttpInterceptor(req, next))

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(interceptor).toBeTruthy()
  })
})
