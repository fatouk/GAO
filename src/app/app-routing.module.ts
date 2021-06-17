import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdinateurCreateComponent } from './admin/ordinateur/ordinateur-create/ordinateur-create.component';
import { OrdinateurListeComponent } from './admin/ordinateur/ordinateur-liste/ordinateur-liste.component';
import { OrdinateurUpdateComponent } from './admin/ordinateur/ordinateur-update/ordinateur-update.component';
import { ReservationCreateComponent } from './admin/reservation/reservation-create/reservation-create.component';
import { ReservationListeComponent } from './admin/reservation/reservation-liste/reservation-liste.component';
import { ReservationUpdateComponent } from './admin/reservation/reservation-update/reservation-update.component';
import { UserCreateComponent } from './admin/utilisateur/user-create/user-create.component';
import { UserListeComponent } from './admin/utilisateur/user-liste/user-liste.component';
import { UserUpdateComponent } from './admin/utilisateur/user-update/user-update.component';

const routes: Routes = [
{path: 'accueil',redirectTo:"index.html" },
{path: '',component:UserListeComponent},
{path:'userListe',component:UserListeComponent},
{path:'userUpdate/:id',component:UserUpdateComponent},
{path:'userCreate',component:UserCreateComponent},

{path:'ordinateurListe',component:OrdinateurListeComponent},
{path:'ordinateurUpdate/:id',component:OrdinateurUpdateComponent},
{path:'ordinateurCreate',component:OrdinateurCreateComponent},

{path:'reservationListe',component:ReservationListeComponent},
{path:'reservationUpdate/:id',component:ReservationUpdateComponent},
{path:'reservationCreate',component:ReservationCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
