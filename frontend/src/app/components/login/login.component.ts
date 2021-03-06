import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validationForm: FormGroup;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, public fb: FormBuilder) {
    this.validationForm = fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get username() {
    return this.validationForm.get('username');
  }

  get password() {
    return this.validationForm.get('password');
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/map']).then(r =>
        this.reloadPage()
      );
    }
  }

  onSubmit(): void {
    console.log(this.validationForm);
    this.authService.login(this.validationForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().role;
        this.router.navigate(['/map']).then(r =>
          this.reloadPage()
        );
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
