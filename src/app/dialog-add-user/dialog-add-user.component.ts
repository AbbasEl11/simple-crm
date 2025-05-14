import { Component, NgZone, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-add-user',
  imports: [MatDialogModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,FormsModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  ngZone: NgZone = inject(NgZone); 
  user = new User();
  birthDate!: Date;



  constructor() {}

  saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    } else {
      this.user.birthDate = 0; 
    }

    console.log(this.user);
    this.ngZone.run(() => {
      const usersCollection = collection(this.firestore, 'users');
      addDoc(usersCollection, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        birthDate: this.user.birthDate,
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city
      }).then(() => {
        console.log('User added successfully');
      }).catch((error: any) => {
        console.error('Error adding user: ', error);
      });
    });
  }
}
