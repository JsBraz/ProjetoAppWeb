import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../services/location.service';

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

  constructor(private locationService: LocationService, private activatedroute: ActivatedRoute) {
  }

  sub;

  ngOnInit() {

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
          this.errorMessage = err.error.message;
        }
      );
    });
  }

  counterPlus(){
    this.counter = this.counter + 1;
    console.log(this.counter + 1);
  }

  counterMinus(){
    console.log(this.counter - 1);
  }
}
