import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocationService} from '../../services/location.service';

interface User {
  ID: number;
  username: string;
  role: string;
}

interface Location {
  ID: number;
  latitude: number;
  longitude: number;
  name: string;
  people: number;
}

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})

export class BackofficeComponent implements OnInit {

  userElements: User[];
  userHeadElements = ['ID', 'Nome', 'Role', ''];
  locationElements: Location[];
  locationHeadElements = ['ID', 'Nome', 'Latitude', 'Longitude', ''];
  private errorMessage: any;
  hiddenElement: boolean;
  hiddenElement2: boolean;

  constructor(private userService: UserService, private locationService: LocationService) {
    this.hiddenElement = false;
    this.hiddenElement2 = true;

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
        this.userElements = data.data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.locationService.getLocation().subscribe(data => {
      this.locationElements = data.data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  onClickUsersHandler() {
    this.hiddenElement = false;
    this.hiddenElement2 = true;
  }

  onClickLocationsHandler() {
    this.hiddenElement = true;
    this.hiddenElement2 = false;
  }

  onClickDeleteUser(id: number){
    console.log('passou crlh');
    this.userService.deleteUser(id).subscribe(data => {
      this.userElements.forEach((user, index) => {
        if (user.ID === id){
          this.userElements.splice(index, 1);
        }
      });
    });
  }


  onClickDeleteLocation(id: number){
    console.log('passou crlh');
    this.locationService.deleteLocation(id).subscribe(data => {
      this.locationElements.forEach((location, index) => {
        if (location.ID === id){
          this.locationElements.splice(index, 1);
        }
      });
    });
  }
}
