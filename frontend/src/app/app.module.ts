import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {NavComponent} from './components/nav/nav.component';
import {HomeComponent} from './components/home/home.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {AgmCoreModule} from '@agm/core';
import {MapComponent} from './components/map/map.component';
import {LocationComponent} from './components/location/location.component';
import {BackofficeComponent} from './components/backoffice/backoffice.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    MapComponent,
    LocationComponent,
    BackofficeComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([], {useHash: true}),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNWbLqQhQq5zmtUd9Z7owepfLn0OckinE'
    }),
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
