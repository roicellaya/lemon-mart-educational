import { Component, DestroyRef, OnInit, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexModule } from '@ngbracket/ngx-layout'
import { Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'
import { AuthService } from '../../auth/auth.service'
import { UiService } from '../../common/ui.service'
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAZipCodeValidation,
} from '../../common/validations'
import { UserService } from '../user.service'
import { IUser, PhoneType } from '../user/user'
import { IUSState } from './data'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,
    FlexModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  Role = Role
  PhoneType = PhoneType
  PhoneTypes = $enum(PhoneType).getKeys()
  formGroup: FormGroup | undefined
  states$: Observable<IUSState[]> | undefined
  userError = ''
  currentUserId: string | undefined
  private destroyRef = inject(DestroyRef)

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm()
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id
          this.buildForm(user)
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }
  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }
  buildForm(user?: IUser) {
    this.formGroup = this.formBuilder.group({
      email: [
        {
          value: user?.email || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidation],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
    })
  }
}
