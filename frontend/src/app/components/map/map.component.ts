import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';

interface Locations {
  ID: number;
  name: string;
  latitude: number;
  longitude: number;
  people: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  markers: Locations[];

  longitude = -8.628649023896578;
  latitude = 41.16136223175756;

  private errorMessage: any;

  constructor(private router: Router, private locationService: LocationService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']).then(r =>
        this.reloadPage()
      );
    } else {
      this.locationService.getLocation().subscribe(data => {
          this.markers = data.data;
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
    }
  }


  goToLocation(locationID) {
    this.router.navigate(['/location/' + locationID]);
  }


  reloadPage(): void {
    window.location.reload();
  }
}
