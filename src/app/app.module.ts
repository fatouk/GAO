import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccordionModule} from 'primeng/accordion';     
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AccueilComponent } from './admin/accueil/accueil.component';
import { UserCreateComponent } from './admin/utilisateur/user-create/user-create.component';
import { UserUpdateComponent } from './admin/utilisateur/user-update/user-update.component';
import { UserListeComponent } from './admin/utilisateur/user-liste/user-liste.component';
import { OrdinateurListeComponent } from './admin/ordinateur/ordinateur-liste/ordinateur-liste.component';
import { OrdinateurCreateComponent } from './admin/ordinateur/ordinateur-create/ordinateur-create.component';
import { OrdinateurUpdateComponent } from './admin/ordinateur/ordinateur-update/ordinateur-update.component';
import { ReservationUpdateComponent } from './admin/reservation/reservation-update/reservation-update.component';
import { ReservationCreateComponent } from './admin/reservation/reservation-create/reservation-create.component';
import { ReservationListeComponent } from './admin/reservation/reservation-liste/reservation-liste.component';
import { MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {HttpClient } from '@angular/common/http';
import {FileUploadModule } from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {HttpClientModule } from '@angular/common/http';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmationService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown'
import {FieldsetModule} from 'primeng/fieldset';
import {DialogModule} from 'primeng/dialog';
  

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserListeComponent,
    OrdinateurListeComponent,
    OrdinateurCreateComponent,
    OrdinateurUpdateComponent,
    ReservationUpdateComponent,
    ReservationCreateComponent,
    ReservationListeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    FileUploadModule,
    ToolbarModule,
    HttpClientModule,
    MultiSelectModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    FieldsetModule,
    DialogModule

    
  ],
  providers: [MessageService,HttpClient,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
