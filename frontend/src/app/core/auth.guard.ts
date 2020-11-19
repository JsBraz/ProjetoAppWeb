import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.api.isLoggedInSetted) {
      return true;
    }

    return this.api.isLoggedIn().pipe(map(res => {
      if (res.authenticated) {
        this.api.setLoggedInStatus(true);
        return true;
      }
      else {
        this.router.navigate(['admin/login']);
        return false;
      }
    }));


  }
}
