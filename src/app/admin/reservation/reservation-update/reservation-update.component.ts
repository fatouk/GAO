import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { Reservation } from 'src/app/model/Reservation';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { OrdinateurCreateComponent } from '../../ordinateur/ordinateur-create/ordinateur-create.component';

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.scss']
})
export class ReservationUpdateComponent implements OnInit {
  reservationUpdateForm!: FormGroup;
  id!:number;
  reservation!:Reservation;
  statuslist:any[]=[];
  currentuser!:Utilisateur;
  submitted=false;
  selectedUtilisateur!: Utilisateur;
  selectedOrdinateur!: Ordinateur;
  utilisateurlist: any[] = [];
  ordinateurlist: any[] = [];
  constructor(public formBuilder: FormBuilder,private messageService:MessageService,private reservationService:ReservationService,
    private utilisateurService:UtilisateurService,private ordinateurService:OrdinateurService,private route:Router,private activatedRoute:ActivatedRoute) {
   } 
  async ngOnInit() { 
    this.loadStatus();
    this.reservation=new Reservation();
    this.id=this.activatedRoute.snapshot.params['id'];
    await this.loadReservation(this.id); 
    await this.loadOrdinateur();
    this.loadUtilisateur();   
  }

  async loadReservation(id:number){ 
    console.log("log1 loadReservation debut===============") ; 
    this.reservation = await this.reservationService.getReservationByid(id).toPromise();
      // this.reservation=data;    
    console.log("loadReservation===============",this.reservation) ;
      this.reservationUpdateForm = new FormGroup({
      utilisateur!: new FormControl(this.reservation!.utilisateur, [Validators.required,Validators.maxLength(240)]),
      ordinateur!: new FormControl(this.reservation!.ordinateur,[Validators.required,Validators.maxLength(240)]),
      dateDebutReservation!: new FormControl(new Date(this.reservation!.dateDebutReservation.toLocaleString()), [Validators.required,Validators.maxLength(240)]),
      dateFinReservation!: new FormControl(new Date(this.reservation!.dateFinReservation.toLocaleString()), [Validators.required]),
      etat!: new FormControl(this.reservation!.etat, [Validators.required,Validators.maxLength(20)]),
      status!: new FormControl(this.reservation!.status, [Validators.required])
    });  
  return this.reservationUpdateForm;
  }

  get utilisateur() {return this.reservationUpdateForm.get('utilisateur'); }
  get ordinateur() { return this.reservationUpdateForm.get('ordinateur'); }
  get dateDebutReservation() { return this.reservationUpdateForm.get('dateDebutReservation'); }
  get dateFinReservation() { return this.reservationUpdateForm.get('dateFinReservation'); }
  get etat() { return this.reservationUpdateForm.get('etat'); }
  get status() {return this.reservationUpdateForm.get('status'); }
  get f() { return this.reservationUpdateForm.controls; }
  
 async loadOrdinateur(){
  this.id=this.activatedRoute.snapshot.params['id'];
  await this.loadReservation(this.id);
   this.ordinateurlist = [];
    let result: Ordinateur[]= await this.ordinateurService.getOrdinateurs().toPromise();
   for(let q of result){
    if(this.reservation.ordinateur!==null && q.id===this.reservation.ordinateur!.id){
         this.ordinateurlist.push({label:q.code+"-"+q.marque,value:q});
    }else{
      if(q.status==="LIBRE" && q!==this.reservation.ordinateur){
        this.ordinateurlist.push({label:q.code+"-"+q.marque,value:q});
        }
        }
     }
}

async loadUtilisateur(){
  this.id=this.activatedRoute.snapshot.params['id'];
  this.loadReservation(this.id);
  this.utilisateurlist = [];   
  let result:Utilisateur[]= await this.utilisateurService.getUsers().toPromise();
   for(let q1 of result){
    if(this.reservation.utilisateur!==null && q1.id==this.reservation.utilisateur!.id){
        this.utilisateurlist.push({label:q1.prenom+"-"+q1.nom,value:q1});
    }else{
      if(q1.status==="LIBRE" && q1!==this.reservation.utilisateur){
        this.utilisateurlist.push({label:q1.prenom+"-"+q1.nom,value:q1});
      }
    }
   
  }
}
  loadStatus(){  
    this.statuslist=[];
    this.statuslist.push({label:"ENCOURS",value:"ENCOURS"});
    this.statuslist.push({label:"TERMINE",value:"TERMINE"});
 }

 async updateReservation(id:number,reservation:Reservation){
  if (this.reservationUpdateForm.invalid) {
    this.messageService.add({severity:'error',key:'tc', summary: 'Successful', detail: 'Veuillez renseigner tous les champs'});
    return;
}
   try {
      reservation.utilisateur=this.reservationUpdateForm.get('utilisateur')!.value;
      reservation.ordinateur=this.reservationUpdateForm.get('ordinateur')!.value;
      reservation.dateDebutReservation=this.dateDebutReservation!.value;
      reservation.dateFinReservation=this.dateFinReservation!.value;
      reservation.etat=this.etat!.value;
      reservation.status=this.status!.value;
      this.submitted=true;
      const res = await this.reservationService.updateReservation(id,reservation).toPromise();
      ;
      // if(this.currentuser.id===user.id){
      //    localStorage.setItem('currentuser', JSON.stringify(user));
      // }
      // console.log('res:', res);
      this.reservation=new Reservation();
      this.route.navigate(['reservationListe']);
    } catch (error) {
      
    }
  }
}
