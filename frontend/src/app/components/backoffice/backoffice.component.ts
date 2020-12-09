import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocationService} from '../../services/location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {PusherService} from '../../services/pusher.service';
import {HttpClient} from '@angular/common/http';
import {LocationModel} from '../../models/location.model';
import {Subscription} from 'rxjs';

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


  longitude = -8.628649023896578;
  latitude = 41.16136223175756;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  private locationSubscription: Subscription;
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
  private httpClient: HttpClient;

  constructor(private userService: UserService, private locationService: LocationService, public fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private pusherService: PusherService,
              private http: HttpClient) {


    this.httpClient = http;
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
    this.locationSubscription = pusherService
      .getLocationsItems()
      .subscribe(() => {}
      );
  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });

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

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
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
            this.updateLocationMap();
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
      },
        err => {
          if (err.error.status === 404) {
            this.tokenStorage.signOut();
            this.router.navigate(['/login']).then(() =>
              this.reloadPage()
            );
          }
        });
    }
  }

  onLocationSubmit() {
    if (this.checkIfTokenIsValid() === true) {
      this.locationService.addLocation(this.locationValidationForm.value).subscribe(data => {
        console.log(data);
        this.locationElements.push(data.location);
        this.updateLocationMap();
      });
    }
  }

  updateLocationMap(){
    this.http
      .post('http://localhost:3000/updateLocation', {})
      .toPromise()
      .then(() => {
      })
      .catch(error => {
        console.log(error.error.message);
      });
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
