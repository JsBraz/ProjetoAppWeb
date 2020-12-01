import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocationService} from "../../services/location.service";

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
    this.locationService.getLocations().subscribe(data => {
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
}
