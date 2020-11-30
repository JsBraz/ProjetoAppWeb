import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  location = [];
  private id: string;
  name: string;
  counter: number;
  private errorMessage: any;

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
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    });
  }
}
