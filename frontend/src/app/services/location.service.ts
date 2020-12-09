import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:4200/api/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getLocation(): Observable<any> {
    return this.http.get(AUTH_API + 'getLocations', httpOptions);
  }

  getLocationById(id): Observable<any> {
    return this.http.get(AUTH_API + 'getLocationById/' + id, httpOptions);
  }

  updateCouter(data): Observable<any> {
    console.log(data[0].counter);
    return this.http.put(AUTH_API + 'updateLocation', {
      id: data[0].id,
      people: data[0].people
    }, httpOptions);
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.get(AUTH_API + 'deleteLocation/' + id, httpOptions);
  }

  addLocation(location): Observable<any> {
    return this.http.post(AUTH_API + 'addLocation', {
      name: location.name,
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
    }, httpOptions);
  }
}
