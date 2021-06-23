import { Component, OnInit } from '@angular/core';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  data: any;
  ListUser: any[] = [];
  ListOrdinateur: any[] = [];
  ListUserOCCUPE: any[] = [];
  ListOrdinateurOCCUPE: any[] = [];
  constructor(private userService:UtilisateurService,private ordinateurService:OrdinateurService) { 
    
} 

 async ngOnInit() {
await this.loadUtilisateur();
await this.loadOrdinateur();
await this.loadUtilisateurOCCUPE();
await this.loadOrdinateurOCCUPE();
console.log("list===",this.ListOrdinateur);
    this.data = {
      labels: ['Utilisateur LIBRE','Utilisateur OCCUPE','Ordinateur LIBRE','Ordinateur OCCUPE'],
      datasets: [{
              data: [this.ListUser.length, this.ListUserOCCUPE.length, this.ListOrdinateur.length,this.ListOrdinateurOCCUPE.length],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#ddCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#ddCE56"
              ]
          }]    
      };
  }
  async loadUtilisateur(){
    this.ListUser = [];
    let result: Utilisateur[]= await this.userService.getUsers().toPromise();
    let result1=result.filter(data=>data.status==="LIBRE");
    this.ListUser=result1;
    // for(let q of result1){
    //   this.ListUser.push({label:q.prenom+"-"+q.nom,value:q});
    // }
 }
 async loadOrdinateur(){
   this.ListOrdinateur = [];
  let result: Ordinateur[]= await this.ordinateurService.getOrdinateurs().toPromise();
   let result1=result.filter(data=>data.status==="LIBRE");
  for(let q of result1){
    this.ListOrdinateur.push(q);
  }
 }
 async loadUtilisateurOCCUPE(){
  this.ListUserOCCUPE = [];
  let result: Utilisateur[]= await this.userService.getUsers().toPromise();
  let result1=result.filter(data=>data.status==="OCCUPE");
  this.ListUserOCCUPE=result1;
  // for(let q of result1){
  //   this.ListUser.push({label:q.prenom+"-"+q.nom,value:q});
  // }
}
async loadOrdinateurOCCUPE(){
 this.ListOrdinateurOCCUPE = [];
let result: Ordinateur[]= await this.ordinateurService.getOrdinateurs().toPromise();
 let result1=result.filter(data=>data.status==="OCCUPE");
for(let q of result1){
  this.ListOrdinateurOCCUPE.push(q);
}
}



}
