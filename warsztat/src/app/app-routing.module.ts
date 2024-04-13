import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ClientPageComponent } from './clientPage/clientPage.component';
import { RepairPageComponent } from './repairPage/repairPage.component';
import { CarsPageComponent } from './carsPage/carsPage.component';
import { UsersPageComponent } from './usersPage/usersPage.component';
import { OfferPageComponent } from './offerPage/offerPage.component';
import { InvoicePageComponent } from './invoicePage/invoicePage.component';
import { SingleClientInfoComponent } from './singleClientInfo/singleClientInfo.component';
import { CarPageComponent } from './carPage/carPage.component';
import { SingleRepairComponent } from './singleRepair/singleRepair.component';
import { EquipmentListComponent } from './equipmentList/equipmentList.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "naprawy", component: RepairPageComponent, canActivate: [authGuard]},
  {path: "klienci", component: ClientPageComponent, canActivate: [authGuard]},
  {path: "samochody", component: CarsPageComponent, canActivate: [authGuard]},
  {path: "uslugi", component: OfferPageComponent, canActivate: [authGuard]},
  {path: "uzytkownicy", component: UsersPageComponent, canActivate: [authGuard]},
  {path: "faktury", component: InvoicePageComponent, canActivate: [authGuard]},
  {path: "klient/:id", component: SingleClientInfoComponent, canActivate: [authGuard]},
  {path: "naprawa/:id", component: SingleRepairComponent, canActivate: [authGuard]},
  {path: "samochod/:id", component: CarPageComponent, canActivate: [authGuard]},
  {path: "maszyny", component: EquipmentListComponent, canActivate: [authGuard]},
  {path: "", pathMatch: "full", redirectTo: "kokpit"}, // Redirect to your homepage
  {path: "kokpit", canActivate: [authGuard], component: HomepageComponent}, // Define a separate route for the homepage
  // {path: "**", component: NotFoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
