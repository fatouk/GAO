import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userCreateForm!: FormGroup;
  user:Utilisateur=new Utilisateur();
  submitted=false;
  selectedProfil!: String;
  profillist:any[]=[];

  constructor(public formBuilder: FormBuilder,private messageService:MessageService,private userService:UtilisateurService,private route:Router) {
   } 

  ngOnInit(): void {
    this.loadProfil();
    this.userCreateForm = new FormGroup({
    nom: new FormControl(this.user!.nom, [Validators.required,Validators.maxLength(240)]),
    prenom: new FormControl(this.user!.prenom, [Validators.required,Validators.maxLength(240)]),
    login: new FormControl(this.user!.login, [Validators.required,Validators.maxLength(240)]),
    email: new FormControl(this.user!.email, [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl(this.user!.password, [Validators.required,Validators.maxLength(240)]),
    telephone: new FormControl(this.user!.telephone, [Validators.required,Validators.maxLength(240)]),
    datenais: new FormControl(this.user!.datenais, [Validators.required,Validators.maxLength(240)]),
    etat: new FormControl(this.user!.etat, [Validators.required,Validators.maxLength(20)]),
    profil: new FormControl(this.user!.profil, [Validators.required])
  });

  }

  get nom() { return this.userCreateForm.get('nom'); }
  get prenom() { return this.userCreateForm.get('prenom'); }
  get login() { return this.userCreateForm.get('login'); }
  get email() { return this.userCreateForm.get('email'); }
  get password() { return this.userCreateForm.get('password'); }
  get telephone() { return this.userCreateForm.get('telephone'); }
  get datenais() { return this.userCreateForm.get('datenais'); }
   get etat() { return this.userCreateForm.get('etat'); }
  get profil() { return this.userCreateForm.get('profil'); }

  get valueOfForm(): Utilisateur {
    this.user.nom=this.nom!.value;
    this.user.prenom=this.prenom!.value;
    this.user.login=this.login!.value;
    this.user.email=this.email!.value;
    this.user.password=this.password!.value;
    this.user.telephone=this.telephone!.value;
    this.user.datenais=this.datenais!.value;
    this.user.etat=this.etat!.value;
    this.user.profil=this.profil!.value;
    return this.user;
  }
  loadProfil(){
    this.profillist=[];
    this.profillist.push({label:"USER",value:"USER"});
    this.profillist.push({label:"SUPERADMIN",value:"SUPERADMIN"});   
   console.log("result:"+JSON.stringify(this.profillist)); 
 }
 get f() { return this.userCreateForm.controls; }
 redirectTo(uri:string){
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.route.navigate([uri]));
}
 async onSubmit(){
  if (this.userCreateForm.invalid) {
    this.messageService.add({severity:'error',key:'tc', summary: 'Successful', detail: 'Veuillez renseigner tous les champs'});
    return;
}
this.submitted=true;
await this.userService.createUser(this.valueOfForm).subscribe(data=>console.log(data),error=>console.log(error));
this.user=new Utilisateur();
await this.messageService.add({severity:'success',key:'tc', summary: 'Successful', detail: 'Utilisateur Enregistré'});
// this.route.navigate(['userListe']);
this.redirectTo('userListe');
}

}
