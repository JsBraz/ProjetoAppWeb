<<<<<<< HEAD
import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocationService} from "../../services/location.service";

interface User {
=======
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

interface Users {
>>>>>>> dcf64852ddb34c1cd5c093c3ff1d709e9146a81f
  ID: number;
  username: string;
  role: string;
}

<<<<<<< HEAD
interface Location {
  ID: number;
  latitude: number;
  longitude: number;
  name: string;
  people: number;
}

=======
>>>>>>> dcf64852ddb34c1cd5c093c3ff1d709e9146a81f
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
<<<<<<< HEAD


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
=======
export class BackofficeComponent implements OnInit {
  elements: Users[];
  headElements = ['ID', 'Nome', 'Role',''];
  private errorMessage: any;

  constructor(private userService: UserService) {
>>>>>>> dcf64852ddb34c1cd5c093c3ff1d709e9146a81f
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
<<<<<<< HEAD
        this.userElements = data.data;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.locationService.getLocation().subscribe(data => {
        this.locationElements = data.data;
=======
        this.elements = data.data;
>>>>>>> dcf64852ddb34c1cd5c093c3ff1d709e9146a81f
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


  onClickDeleteUser(id:number){
    console.log("passou crlh")
    this.userService.deleteUser(id).subscribe(data => {
      this.userElements.forEach((user,index) =>{
        if(user.ID===id){
          this.userElements.splice(index,1)
          
        }
      })
    });
  }


  onClickDeleteLocation(id:number){
    console.log("passou crlh")
    this.locationService.deleteLocation(id).subscribe(data => {
      this.locationElements.forEach((location,index) =>{
        if(location.ID===id){
          this.locationElements.splice(index,1)
          
        }
      })
    });
  }
}
