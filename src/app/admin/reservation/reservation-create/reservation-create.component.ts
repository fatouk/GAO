import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { Reservation } from 'src/app/model/Reservation';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { OrdinateurCreateComponent } from '../../ordinateur/ordinateur-create/ordinateur-create.component';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss']
})
export class ReservationCreateComponent implements OnInit {

  reservationCreateForm!: FormGroup;
  reservation:Reservation=new Reservation();
  submitted=false;
  selectedUtilisateur!: Utilisateur;
  selectedOrdinateur!: Ordinateur;
  profillist:any[]=[];
  utilisateurlist: any[] = [];
  ordinateurlist: any[] = [];

  constructor(public formBuilder: FormBuilder,private messageService:MessageService,private reservationService:ReservationService,
    private utilisateurService:UtilisateurService,private ordinateurService:OrdinateurService,private route:Router) {
   } 

  ngOnInit(): void {
    this.loadUtilisateur();
    this.loadOrdinateur();
    this.reservationCreateForm = new FormGroup({
    utilisateur: new FormControl(this.reservation!.utilisateur, [Validators.required,Validators.maxLength(240)]),
    ordinateur: new FormControl(this.reservation!.ordinateur, [Validators.required,Validators.maxLength(240)]),
    dateDebutReservation: new FormControl(this.reservation!.dateDebutReservation, [Validators.required,Validators.maxLength(240)]),
    dateFinReservation: new FormControl(this.reservation!.dateFinReservation, [Validators.required,Validators.maxLength(240)]),
    etat: new FormControl(this.reservation!.etat)
  });

  }

  get utilisateur() { return this.reservationCreateForm.get('utilisateur'); }
  get ordinateur() { return this.reservationCreateForm.get('ordinateur'); }
  get dateDebutReservation() { return this.reservationCreateForm.get('dateDebutReservation'); }
  get dateFinReservation() { return this.reservationCreateForm.get('dateFinReservation'); }
  get etat() { return this.reservationCreateForm.get('etat'); }
 

  get valueOfForm(): Reservation {
    this.reservation.utilisateur=this.utilisateur!.value;
    this.reservation.ordinateur=this.ordinateur!.value;
    this.reservation.dateDebutReservation=this.dateDebutReservation!.value;
    this.reservation.dateFinReservation=this.dateFinReservation!.value;
    this.reservation.etat=this.etat!.value;
    
    return this.reservation;
  }
  async loadUtilisateur(){
    this.utilisateurlist = [];
    let result: Utilisateur[]= await this.utilisateurService.getUsers().toPromise();
    let result1=result.filter(data=>data.status==="LIBRE");
    for(let q of result1){
      this.utilisateurlist.push({label:q.prenom+"-"+q.nom,value:q});
    }
 }
 async loadOrdinateur(){
  this.ordinateurlist = [];
  let result: Ordinateur[]= await this.ordinateurService.getOrdinateurs().toPromise();
   let result1=result.filter(data=>data.status==="LIBRE");
  for(let q of result1){
    this.ordinateurlist.push({label:q.code+"-"+q.marque,value:q});
  }
}
 get f() { return this.reservationCreateForm.controls; }
 redirectTo(uri:string){
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.route.navigate([uri]));
}
 async onSubmit(){
  if (this.reservationCreateForm.invalid) {
    this.messageService.add({severity:'error',key:'tc', summary: 'Successful', detail: 'Veuillez renseigner tous les champs'});
    return;
}
if (this.valueOfForm.dateDebutReservation > this.valueOfForm.dateFinReservation) {
  this.messageService.add({severity:'error',key:'tc', summary: 'Error', detail: 'la date debut ne doit pas etre superieure à la date de fin'});
   return;
}
this.submitted=true;
await this.reservationService.createReservation(this.valueOfForm).toPromise();
this.reservation=new Reservation();
// this.redirectTo('reservationListe');
this.route.navigate(['reservationListe']);

}

}
