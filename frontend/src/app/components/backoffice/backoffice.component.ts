import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocationService} from '../../services/location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

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
  locationHeadElements = ['ID', 'Latitude', 'Longitude', 'Nome', ''];
  private errorMessage: any;
  hiddenElement: boolean;
  hiddenElement2: boolean;
  checkBox: boolean;
  userValidationForm: FormGroup;
  locationValidationForm: FormGroup;
  disabled: false;

  constructor(private userService: UserService, private locationService: LocationService, public fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router) {
    this.hiddenElement = false;
    this.hiddenElement2 = true;
    this.checkBox = false;
    this.userValidationForm = fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      isAdmin: [null],
    });
    this.locationValidationForm = fb.group({
      name: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.checkIfTokenIsValid() === true) {
      this.userService.getUsers().subscribe(data => {
          this.userElements = data.data;
        },
        err => {
          this.errorMessage = err.error.message;
          if (err.error.status === 401){
            this.router.navigate(['/login']).then(() =>
              this.reloadPage()
            );
          }
        }
      );
      this.locationService.getLocation().subscribe(data => {
          this.locationElements = data.data;
        },
        err => {
          this.errorMessage = err.error.message;
          if (err.error.status === 401){
            this.router.navigate(['/login']).then(() =>
              this.reloadPage()
            );
          }
        }
      );
    } else {
    }
  }

  get username() {
    return this.userValidationForm.get('username');
  }

  get password() {
    return this.userValidationForm.get('password');
  }

  reloadPage(): void {
    window.location.reload();
  }

  onClickUsersHandler() {
    this.hiddenElement = false;
    this.hiddenElement2 = true;
  }

  onClickLocationsHandler() {
    this.hiddenElement = true;
    this.hiddenElement2 = false;
  }

  onClickDeleteUser(id: number) {
    if (this.checkIfTokenIsValid() === true) {
    this.userService.deleteUser(id).subscribe(data => {
      this.userElements.forEach((user, index) => {
        if (user.ID === id) {
          this.userElements.splice(index, 1);
        }
      });
    },
      err => {
        /*if (err.error.status === 404) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']).then(() =>
            this.reloadPage()
          );
        }*/
      });
    }
  }

  onClickDeleteLocation(id: number) {
    if (this.checkIfTokenIsValid() === true) {
      this.locationService.deleteLocation(id).subscribe(data => {
        this.locationElements.forEach((location, index) => {
          if (location.ID === id) {
            this.locationElements.splice(index, 1);
          }
        });
      });
    }
  }

  onUserSubmit() {


    if (this.checkIfTokenIsValid() === true) {
      if (this.userValidationForm.value.isAdmin === true) {
        this.userValidationForm.value.isAdmin = 'admin';
      } else {
        this.userValidationForm.value.isAdmin = 'user';
      }

      this.userService.addUser(this.userValidationForm.value).subscribe(data => {
        console.log(data);
        this.userElements.push(data.user);
      });
    }
  }

  onLocationSubmit() {
    if (this.checkIfTokenIsValid() === true) {
      this.locationService.addLocation(this.locationValidationForm.value).subscribe(data => {
        console.log(data);
        this.locationElements.push(data.location);
      });
    }
  }

  checkIfTokenIsValid() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']).then(r =>
        this.reloadPage()
      );
    }
    return true;
  }
}
