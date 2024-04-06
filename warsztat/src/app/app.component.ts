import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ){}
 


  
  title = 'Kokpit';
  logout(){
    localStorage.removeItem('token');
    console.log("Poprawnie wylogowano");
    this.router.navigate(['/login']);
  }
  isLogged(){
    return this.authService.isAuth();
  }
  expandNav(){
    if(document.getElementById("nav")!.classList.contains("expanded")){
      document.getElementById("nav")!.classList.remove("expanded");

    } else {
      document.getElementById("nav")!.classList.add("expanded");

    }
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }
}

