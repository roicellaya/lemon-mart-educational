import { inject } from '@angular/core'
import { jwtDecode } from 'jwt-decode'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators'

import { CacheService } from '../common/cache.service'
import { transformError } from '../common/common'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'

export abstract class AuthService implements IAuthService {
  constructor() {}

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())
  protected readonly cache = inject(CacheService)

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>
  protected abstract transformJwtToken(token: unknown): IAuthStatus
  protected abstract getCurrentUser(): Observable<User>

  login(email: string, password: string): Observable<void> {
    this.clearToken()
    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        const token = jwtDecode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap((status) => this.authStatus$.next(status)),
      filter((status: IAuthStatus) => status.isAuthenticated),
      mergeMap(() => this.getCurrentUser()),
      map((user) => this.currentUser$.next(user)),
      catchError(transformError)
    )
    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(() => new Error(err))
      },
    })
    return loginResponse$
  }
  logout(clearToken?: boolean | undefined): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }
  protected setToken(jwt: string) {
    this.cache.setItem('jwt', jwt)
  }
  getToken(): string {
    return this.cache.getItem('jwt') ?? ''
  }
  protected clearToken() {
    this.cache.removeItem('jwt')
  }
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}
