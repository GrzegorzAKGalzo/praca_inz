import { Component } from '@angular/core';
import { EmailValidatorService } from '../emailValidator.service';
import { LoginapiService } from '../loginapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email = '';
  public password = '';
  public error:Array<string> = [];
  public passwordToggler = false;

  constructor(
    private emailValidationService: EmailValidatorService,
    private LoginapiService: LoginapiService,
    private router: Router
  ){}


  loginSubmit() {
    this.error = [];
    if(this.emailValidationService.isValid(this.email)){
      this.error.push("Muisz podać poprawny Email");
      return ;
    }
    if(this.password == ''){
      this.error.push("Muisz wpisać Hasło");
      return ;
    }
    this.LoginapiService.login({username: this.email, password: this.password}).subscribe({
      next:(response: any)=>{

        const token = response.token
        console.log("Login Token:", token)
        localStorage.setItem('token', token)
        this.LoginapiService.triggerRefresh();
        this.router.navigate(['/'])
      },
      error: (error: any)=>{
        console.log(error)
        if(error.status == 401 || error.status == 404){
           this.error.push("Nie Poprawny Login lub Hasło");

        }
      }
    })

  }
 
}
