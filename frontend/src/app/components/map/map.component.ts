import {Component, OnInit, OnDestroy } from '@angular/core';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  /* markers = [
    {id: 1, name: 'Marshopping', latitude: 41.20914936478033, longitude: -8.687319273437796, counter: 34},
    {id: 2, name: 'Norte Shopping', latitude: 41.18098595200483, longitude: -8.654608488782772, counter: 54},
    {id: 3, name: 'Gaia Shopping', latitude: 41.11850644409132, longitude: -8.622378517620648, counter: 12},
  ]; */
  private errorMessage: any;

  constructor(private router: Router, private locationService: LocationService) {
  }

  ngOnInit(): void {
      this.locationService.getLocation().subscribe(data => {
          this.markers = data.data;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
  }


  goToLocation(locationID) {
    this.router.navigate(['/location/' + locationID]);
  }
}
