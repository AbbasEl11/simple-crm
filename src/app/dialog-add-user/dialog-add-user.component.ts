import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-dialog-add-user',
  imports: [MatDialogModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,FormsModule,MatProgressBarModule, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false
  private userService = inject(UserService);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }

  async saveUser() {
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    this.loading = true;
  
    try {
      await this.userService.addUser(this.user); 
      console.log('User added successfully');
      this.dialogRef.close();
    } catch (error: any) {
      console.error('Error adding user:', error);
    } finally {
      this.loading = false;
    }
  }
  
  close() {
    this.dialogRef.close()
  }
}
