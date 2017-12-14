import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from "angular-calendar";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ReservationsComponent} from './reservations/reservations.component';
import {ReparationTerrainComponent} from './reparation-terrain/reparation-terrain.component';
import {ChangementPelouseComponent} from './changement-pelouse/changement-pelouse.component';
import {AbonnementComponent} from './abonnement/abonnement.component';
import {RouterModule, Routes} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReservationService} from "../services/ReservationService";
import {TerrainService} from "../services/TerrainService";
import {AbonnementService} from "../services/AbonnementService";
import {ReparationLumiereService} from "../services/ReparationLumiereService";
import {ChangementPelouseService} from "../services/ChangementPelouseService";
import {AuthenticationService} from "../services/AuthenticationService";
import { AuthentificationComponent } from './authentification/authentification.component';
import {ClientService} from "../services/ClientService";
import {CanActivateAuthGuard} from "./can-activate.authguard";
import { UsersComponent } from './users/users.component';
import {UserService} from "../services/UserService";

const appRoutes: Routes = [
  {path: 'reservation', component: ReservationsComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'changementPelouse', component: ChangementPelouseComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'reparationLumiere', component: ReparationTerrainComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'abonnement', component: AbonnementComponent, canActivate: [CanActivateAuthGuard]},
  {path: 'authentification', component: AuthentificationComponent},
  {path: 'users', component: UsersComponent},
  {path: '', redirectTo: '/authentification', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    ReparationTerrainComponent,
    ChangementPelouseComponent,
    AbonnementComponent,
    AuthentificationComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    NgbModule
  ],
  providers: [ReservationService, AbonnementService, ChangementPelouseService,
    ReparationLumiereService, TerrainService, AbonnementService, ClientService,
    AuthenticationService, CanActivateAuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
