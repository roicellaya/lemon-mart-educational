import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <span class="flex-spacer"></span>
      @if (data.cancelText) {
        <button mat-button mat-dialog-close>
          {{ data.cancelText }}
        </button>
      }
      <button
        mat-button
        mat-button-raised
        color="primary"
        [mat-dialog-close]="true"
        cdkFocusInitial
      >
        {{ data.okText }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [``],
})
export class SimpleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string
      content: string
      okText: string
      cancelText: string
    }
  ) {}
}
