import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

interface Users {
  ID: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {
  elements: Users[];
  headElements = ['ID', 'Nome', 'Role',''];
  private errorMessage: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
        this.elements = data.data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

}
