import { Component, NgZone, OnInit, inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule,CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  userId = "";
  user: User = new User();

  constructor(private route:ActivatedRoute,  private userService:UserService) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') ?? '';
      this.userService.getUsers().subscribe(users => {
        const foundUser = users.find((u: any) => u.id === this.userId);
        if (foundUser) {
          this.user = new User(foundUser);
        }
      });
      
    })
  }
}
