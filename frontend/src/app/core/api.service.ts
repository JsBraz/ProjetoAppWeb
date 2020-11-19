import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Status } from './status.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
    'cache-control': 'max-age=0'
  })
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = '/rest/';
  // Define API
  apiURL = 'http://94.237.93.111:3000';

  public maxOffset: number;

  private loggedInStatus = false;

  constructor(
    private http: HttpClient,
  ) {
  }


  // -----------------------------------
  // -------------- LOGIN --------------
  // -----------------------------------

  loginUser(user, pass) {
    return this.http.get(this.baseUrl + 'login?email=' + user + '&password=' + pass).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  setLoggedInStatus(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedInSetted() {
    return this.loggedInStatus;
  }

  isLoggedIn(): Observable<Status> {
    return this.http.get<Status>(this.baseUrl + 'status');
  }

  logout() {
    return this.http.get(this.baseUrl + 'logout');
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

