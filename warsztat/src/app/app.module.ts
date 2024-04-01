import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormModalComponent } from './formModal/formModal.component';
import { ClientFormComponent } from './clientForm/clientForm.component';
import { ClientPageComponent } from './clientPage/clientPage.component';
import { RepairPageComponent } from './repairPage/repairPage.component';
import { CarPageComponent } from './carPage/carPage.component';
import { RepairFormComponent } from './repairForm/repairForm.component';
import { CarsPageComponent } from './carsPage/carsPage.component';
import { CarFormComponent } from './carForm/carForm.component';

@NgModule({
  declarations: [										
    AppComponent,
    LoginComponent,
      RegisterComponent,
      HomepageComponent,
      FormModalComponent,
      ClientFormComponent,
      ClientPageComponent,
      RepairPageComponent,
      CarPageComponent,
      RepairFormComponent,
      CarsPageComponent,
      CarFormComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
