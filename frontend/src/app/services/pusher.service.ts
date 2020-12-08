import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';
import {LocationModel} from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private subject: Subject<LocationModel> = new Subject<LocationModel>();

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher('de0782592c88f9884fdb', { cluster: 'eu' });

    const channel = this.pusherClient.subscribe('realtime-feeds');

    channel.bind(
      'posts',
      (data: { id: number; counter: number}) => {
        this.subject.next(new LocationModel(data.id, data.counter));
      }
    );
  }

  getFeedItems(): Observable<LocationModel> {
    return this.subject.asObservable();
  }
}
