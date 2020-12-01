import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:4200/api/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
  getLocation(): Observable<any> {
    return this.http.get(AUTH_API + 'getLocations', httpOptions);
  }

  getLocationById(id): Observable<any> {
    return this.http.get(AUTH_API + 'getLocationById/' + id, httpOptions);
  }
}
