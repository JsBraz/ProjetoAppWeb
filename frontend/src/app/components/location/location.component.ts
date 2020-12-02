import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../../services/location.service';
import {TokenStorageService} from '../../services/token-storage.service';

interface Locations {
  ID: number;
  name: string;
  latitude: number;
  longitude: number;
  people: number;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {


  markers: Locations[];
  private id: string;
  name: string;
  counter: number;
  private errorMessage: any;
  longitude;
  latitude;

  constructor(private router: Router, private locationService: LocationService,
              private activatedroute: ActivatedRoute, private tokenStorage: TokenStorageService) {
  }

  sub;

  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']).then(r =>
        this.reloadPage()
      );
    } else {

      this.sub = this.activatedroute.paramMap.subscribe(params => {
        console.log(params.get('id'));
        this.id = params.get('id');
        this.locationService.getLocationById(this.id).subscribe(data => {
            console.log(data.data.name);
            this.name = data.data.name;
            this.counter = data.data.people;
            this.latitude = data.data.latitude;
            this.longitude = data.data.longitude;
          },
          err => {
            if (err.error.status === 401){
              this.tokenStorage.signOut();
              this.router.navigate(['/login']).then(r =>
                this.reloadPage()
              );
            }
            this.errorMessage = err.error.message;
          }
        );
      });
    }
  }

  counterPlus() {
    console.log(this.counter + 1);
  }

  counterMinus() {
    console.log(this.counter - 1);
  }


  reloadPage(): void {
    window.location.reload();
  }

}
