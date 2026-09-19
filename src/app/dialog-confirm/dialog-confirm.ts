import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface ConfirmDialogProp {
  title: '';
  description: '';
}
@Component({
  selector: 'app-dialog-confirm',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-confirm.html',
  styleUrl: './dialog-confirm.scss',
})
export class DialogConfirm implements OnInit {
  protected confirmModel = signal({
    title: '',
    description: '',
  });

  constructor(
    private dialogRef: MatDialogRef<DialogConfirm>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogProp,
  ) {}
  ngOnInit(): void {
    if (this.data) this.confirmModel.set({ ...this.data });
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
