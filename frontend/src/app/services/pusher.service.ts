import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import Pusher from 'pusher-js';
import {LocationModel} from '../models/location.model';
import {UsersLocationsModel} from '../models/usersLocations.model';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private locationModelSubject: Subject<LocationModel> = new Subject<LocationModel>();
  private usersLocationsModelSubject: Subject<UsersLocationsModel[]> = new Subject<UsersLocationsModel[]>();
  private usersLocationsModel: UsersLocationsModel[] = [];

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('de0782592c88f9884fdb', { cluster: 'eu' });

    const channel = this.pusherClient.subscribe('realtime-feeds');

    channel.bind(
      'posts',
      (data: { id: number; counter: number}) => {
        this.locationModelSubject.next(new LocationModel(data.id, data.counter));
      }
    );

    channel.bind(
      'usersLocations',
      (data: { location: string; userName: string, userLocation: string}) => {
        /*const user: UsersLocationsModel = new UsersLocationsModel(data.location, data.userName);
        this.usersLocationsModel.push(user);*/
        const json = JSON.stringify(data.userLocation);
        const users: UsersLocationsModel[] = JSON.parse(json);
        this.usersLocationsModelSubject.next(users);
      }
    );
  }

  getFeedItems(): Observable<LocationModel> {
    return this.locationModelSubject.asObservable();
  }

  getUserLocationsItems(): Observable<UsersLocationsModel[]> {
    return this.usersLocationsModelSubject.asObservable();
  }
}
