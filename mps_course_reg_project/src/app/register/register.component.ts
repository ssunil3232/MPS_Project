import { AuthenticationService } from '../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  loading: boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.loading = true;

    setTimeout(() => {
      this.authenticationService.register(
        this.registerForm.get('username')!.value,
        this.registerForm.get('email')!.value,
        this.registerForm!.get('password')!.value
      );
      this.loading = false
  }, 1000);

    
  }
}
