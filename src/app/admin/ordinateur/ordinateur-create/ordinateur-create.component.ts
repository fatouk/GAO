import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';

@Component({
  selector: 'app-ordinateur-create',
  templateUrl: './ordinateur-create.component.html',
  styleUrls: ['./ordinateur-create.component.scss']
})
export class OrdinateurCreateComponent implements OnInit {
  ordinateurCreateForm!: FormGroup;
  ordinateur:Ordinateur=new Ordinateur();
  submitted=false;
  selectedStatus!: String;
  statuslist:any[]=[];

  constructor(public formBuilder: FormBuilder,private messageService:MessageService,private ordinateurService:OrdinateurService,private route:Router) {
   }

   ngOnInit(): void {
    
    this.ordinateurCreateForm = new FormGroup({
    code: new FormControl(this.ordinateur!.code, [Validators.required,Validators.maxLength(10)]),
    marque: new FormControl(this.ordinateur!.marque, [Validators.required,Validators.maxLength(200)]),
    capacite_disque: new FormControl(this.ordinateur!.capacite_disque, [Validators.required,Validators.maxLength(240)]),
    ram: new FormControl(this.ordinateur!.ram, [Validators.required,Validators.maxLength(240)]),
    etat: new FormControl(this.ordinateur!.etat, [Validators.required,Validators.maxLength(2)])
    
  });

  }
  get code() { return this.ordinateurCreateForm.get('code'); }
  get marque() { return this.ordinateurCreateForm.get('marque'); }
  get capacite_disque() { return this.ordinateurCreateForm.get('capacite_disque'); }
  get ram() { return this.ordinateurCreateForm.get('ram'); }
  get etat() { return this.ordinateurCreateForm.get('etat'); }
 

  get valueOfForm(): Ordinateur {
    this.ordinateur.code=this.code!.value;
    this.ordinateur.marque=this.marque!.value;
    this.ordinateur.capacite_disque=this.capacite_disque!.value;
    this.ordinateur.ram=this.ram!.value;
    this.ordinateur.etat=this.etat!.value;    
    return this.ordinateur;
  }

get f() { return this.ordinateurCreateForm.controls; }
redirectTo(uri:string){
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.route.navigate([uri]));
}
 async onSubmit(){
  if (this.ordinateurCreateForm.invalid) {
    this.messageService.add({severity:'error',key:'tc', summary: 'Successful', detail: 'Veuillez renseigner tous les champs'});
    return;
}else{
  this.submitted=true;
  await this.ordinateurService.createOrdinateur(this.valueOfForm).subscribe(
    data => console.log(data), 
    error => console.log(error)
    );
    this.ordinateur=new Ordinateur();
    //  await  this.route.navigate(['ordinateurListe']);
    this.redirectTo('ordinateurListe');
  
}

}


}
