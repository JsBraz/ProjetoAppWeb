import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpClient} from '@angular/common/http';
import {LocationService} from '../../services/location.service';
import {LocationModel} from '../../models/location.model';
import {Subscription} from 'rxjs';
import {PusherService} from '../../services/pusher.service';

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
  public locationModels: LocationModel[] = [];
  private locationSubscription: Subscription;

  private isSending: boolean;
  private httpClient: HttpClient;
  public content: string;
  public errorMsg: string;
  public infoMsg: string;
  public title: string;


  isAdmin: boolean;
  markers: Locations[];
  private id: string;
  name: string;
  counter: number;
  private errorMessage: any;
  longitude;
  latitude;

  constructor(private router: Router, private locationService: LocationService, private pusherService: PusherService,
              private http: HttpClient,
              private activatedroute: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.httpClient = http;
    this.locationSubscription = pusherService
      .getFeedItems()
      .subscribe((location: LocationModel) => {
        if (location.id.toString() === this.id) {
          this.counter = location.people;
        }
      });

    if (!!this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      const roles = user.Role;

      this.isAdmin = roles.includes('admin');
    }
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
            if (err.error.status === 401) {
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

  submitCounter(newValue) {
    this.errorMsg = '';
    this.isSending = true;
    this.infoMsg = 'Processing your request.. Wait a minute';

    this.http
      .post('http://localhost:3000/submit', {
        id: this.id,
        counter: newValue,
      })
      .toPromise()
      .then((data: { message: string; status: boolean }) => {
        this.infoMsg = data.message;
        setTimeout(() => {
          this.infoMsg = '';
        }, 1000);

        this.isSending = false;
        this.counter = newValue;
        this.updateCount();
      })
      .catch(error => {
        this.infoMsg = '';
        this.errorMsg = error.error.message;

        this.isSending = false;
      });
  }

  counterPlus() {
    this.submitCounter(this.counter + 1);
  }

  counterMinus() {
    this.submitCounter(this.counter - 1);
  }

  updateCount(){
    const data: LocationModel[] = [
      { id: Number.parseInt(this.id, 10), people: this.counter},
    ];

    this.locationService.updateCouter(data).subscribe(data => {
        console.log(data);
      },
      err => {
        if (err.error.status === 401) {
          this.tokenStorage.signOut();
          this.router.navigate(['/login']).then(r =>
            this.reloadPage()
          );
        }
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
