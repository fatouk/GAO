import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';

@Component({
  selector: 'app-ordinateur-update',
  templateUrl: './ordinateur-update.component.html',
  styleUrls: ['./ordinateur-update.component.scss']
})
export class OrdinateurUpdateComponent implements OnInit {

  ordinateurUpdateForm!: FormGroup;
  id!:number;
  ordinateur!:Ordinateur;
  statuslist:any[]=[];
  currentuser!:Utilisateur;
  submitted=false;
  date!:Date;      
  constructor(private ordinateurservice:OrdinateurService,
    private activatedRoute:ActivatedRoute,private route:Router,private formBuilder:FormBuilder,) {
      // this.currentuser=this.auth.currentUser;
    }

    async loadOrdinateur(id:number){
      let data = await this.ordinateurservice.getOrdinateurByid(id).toPromise();
      console.log("data==========",data);
      this.ordinateur=data;     
        this.ordinateurUpdateForm = new FormGroup({
        code!: new FormControl(this.ordinateur!.code, [Validators.required,Validators.maxLength(10)]),
        marque!: new FormControl(this.ordinateur!.marque,[Validators.required,Validators.maxLength(240)]),
        capacite_disque!: new FormControl(this.ordinateur!.capacite_disque, [Validators.required,Validators.maxLength(240)]),
        ram!: new FormControl(this.ordinateur!.ram, [Validators.required,Validators.maxLength(240)]),
        etat!: new FormControl(this.ordinateur!.etat, [Validators.required,Validators.maxLength(20)]),
        status!: new FormControl(this.ordinateur!.status, [Validators.required])
      });
    return  this.ordinateurUpdateForm;
    }
  ngOnInit(): void {
    // this.checkUser();
    this.loadProfil();
    this.ordinateur=new Ordinateur();
    this.id=this.activatedRoute.snapshot.params['id'];
    this.loadOrdinateur(this.id);
       
  }
  get code() { return this.ordinateurUpdateForm.get('code'); }
  get marque() { return this.ordinateurUpdateForm.get('marque'); }
  get capacite_disque() { return this.ordinateurUpdateForm.get('capacite_disque'); }
  get ram() { return this.ordinateurUpdateForm.get('ram'); }
  get etat() { return this.ordinateurUpdateForm.get('etat'); }
  get status() { return this.ordinateurUpdateForm.get('status'); }
 
  get f() { return this.ordinateurUpdateForm.controls; }

  // checkUser(){
  //   if(this.currentuser===undefined || this.currentuser===null){
  //     this.route.navigate(['login']);
  //   }
  // }
  loadProfil(){
    this.statuslist=[];
    this.statuslist.push({label:"LIBRE",value:"LIBRE"});
    this.statuslist.push({label:"OCCUPE",value:"OCCUPE"});
  
 }
 async updateOrdinateur(id:number,ordinateur:Ordinateur){
  
    try {
      ordinateur.code=this.code!.value;
      ordinateur.marque=this.marque!.value;
      ordinateur.capacite_disque=this.capacite_disque!.value;
      ordinateur.ram=this.ram!.value;
      ordinateur.etat=this.etat!.value;
      ordinateur.status=this.status!.value;
      this.submitted=true;
      const res = await this.ordinateurservice.updateOrdinateur(id,ordinateur).toPromise();
      ;
      // if(this.currentuser.id===user.id){
      //    localStorage.setItem('currentuser', JSON.stringify(user));
      // }
      console.log('res:', res);
      this.ordinateur=new Ordinateur();
      this.route.navigate(['ordinateurListe']);
    } catch (error) {
      
    }
  }

}
