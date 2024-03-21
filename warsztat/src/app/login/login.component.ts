import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email = '';
  public passowrd = '';
  public error = '';
  public passwordToggler = false;
  loginSubmit() {
    if(this.email == ''){
      alert("Pusty mail");
    }
  }
 
}
