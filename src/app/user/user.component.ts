import { Component, NgZone,inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';



@Component({
  selector: 'app-user',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatNativeDateModule,MatCardModule,CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})
export class UserComponent implements OnInit{
  user = new User({});
  private ngZone = inject(NgZone);
  private userService = inject(UserService);
  allUser: User[] = [];

  constructor(public dialog: MatDialog,private firestore: Firestore ) {
    
  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.userService.getUsers().subscribe((changes: any) => {
        this.allUser = changes
      });
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent)
  }
}
