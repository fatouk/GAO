import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  userUpdateForm!: FormGroup;
  id!:number;
  user!:Utilisateur;
  profillist:any[]=[];
  currentuser!:Utilisateur;
  submitted=false;
  date!:Date;      
  constructor(private userservice:UtilisateurService,private messageService:MessageService,
    private activatedRoute:ActivatedRoute,private route:Router,private formBuilder:FormBuilder,) {
      // this.currentuser=this.auth.currentUser;
    }

    async loadUser(id:number){
      let data = await this.userservice.getUserByid(id).toPromise();
      this.user=data;
      this.date=this.user.datenais;

      console.log("data========"+data.prenom);
      this.userUpdateForm = new FormGroup({
        nom!: new FormControl(this.user!.nom, [Validators.required,Validators.maxLength(240)]),
        prenom!: new FormControl(this.user!.prenom,[Validators.required,Validators.maxLength(240)]),
        login!: new FormControl(this.user!.login, [Validators.required,Validators.maxLength(240)]),
        email!: new FormControl(this.user!.email, [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password!: new FormControl(this.user!.password, [Validators.required,Validators.maxLength(240)]),
        telephone!: new FormControl(this.user!.telephone, [Validators.required,Validators.maxLength(240)]),
        datenais!: new FormControl(new Date(this.user!.datenais.toLocaleString()), [Validators.required]),
        etat!: new FormControl(this.user!.etat, [Validators.required,Validators.maxLength(20)]),
        profil!: new FormControl(this.user!.profil, [Validators.required])
      });
    return  this.userUpdateForm;
    }
  ngOnInit(): void {
    // this.checkUser();
    this.loadProfil();
    this.user=new Utilisateur();
    this.id=this.activatedRoute.snapshot.params['id'];
    this.loadUser(this.id);
       
  }
  get nom() { return this.userUpdateForm.get('nom'); }
  get prenom() { return this.userUpdateForm.get('prenom'); }
  get login() { return this.userUpdateForm.get('login'); }
  get email() { return this.userUpdateForm.get('email'); }
  get password() { return this.userUpdateForm.get('password'); }
  get telephone() { return this.userUpdateForm.get('telephone'); }
  get datenais() { return this.userUpdateForm.get('datenais');}
  get etat() { return this.userUpdateForm.get('etat'); }
  get profil() { return this.userUpdateForm.get('profil'); }
 
  get f() { return this.userUpdateForm.controls; }

  // checkUser(){
  //   if(this.currentuser===undefined || this.currentuser===null){
  //     this.route.navigate(['login']);
  //   }
  // }
  loadProfil(){
    this.profillist=[];
    this.profillist.push({label:"USER",value:"USER"});
    this.profillist.push({label:"SUPERADMIN",value:"SUPERADMIN"});
  
 }
 async updateUser(id:number,user:Utilisateur){
  if (this.userUpdateForm.invalid) {
    this.messageService.add({severity:'error',key:'tc', summary: 'Successful', detail: 'Veuillez renseigner tous les champs'});
    return;
}

 
    try {
        user.nom=this.nom!.value;
        user.prenom=this.prenom!.value;
        user.login=this.login!.value;
        user.email=this.email!.value;
        user.password=this.password!.value;
        user.telephone=this.telephone!.value;
        user.datenais=this.datenais!.value;
        user.etat=this.etat!.value;
        user.profil=this.profil!.value;
        this.submitted=true;
        const res = await this.userservice.updateUser(id,user).toPromise();
      ;
      // if(this.currentuser.id===user.id){
      //    localStorage.setItem('currentuser', JSON.stringify(user));
      // }
      console.log('res:', res);
      this.user=new Utilisateur();
      this.route.navigate(['userListe']);
    } catch (error) {
      
    }
  }

}
