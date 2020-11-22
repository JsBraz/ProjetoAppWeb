import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validationForm: FormGroup;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  check_name = '';
  check_pass = '';

  constructor(private authService: AuthService, public fb: FormBuilder) {
    this.validationForm = fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  get username() { return this.validationForm.get('username'); }
  get password() { return this.validationForm.get('password'); }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.validationForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
