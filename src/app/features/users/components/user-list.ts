import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.html',
  styles: ``,
})
export class UserList implements OnInit{

  constructor(private userService: UserService){

  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.getUsers();  
  }
}
