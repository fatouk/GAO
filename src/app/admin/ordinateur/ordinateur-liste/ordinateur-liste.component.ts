import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Ordinateur } from 'src/app/model/Ordinateur';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { OrdinateurService } from 'src/app/service/ordinateur.service';

@Component({
  selector: 'app-ordinateur-liste',
  templateUrl: './ordinateur-liste.component.html',
  styleUrls: ['./ordinateur-liste.component.scss']
})
export class OrdinateurListeComponent implements OnInit {

  ordinateurlist: any[] = [];
  items:any[]=[];
  display: boolean = false;
  ordinateurdelete: Ordinateur = new Ordinateur;
  id!: number;
  size!: number;
  currentuser!: Utilisateur;
  droit:boolean=false;
  selectOrdinateur!: Ordinateur[];
  @ViewChild('dt') dt: Table | undefined;
  constructor(private messageService: MessageService,private confirmationmessage:ConfirmationService, private ordinateurService: OrdinateurService,
     private router: Router,private activatedroute:ActivatedRoute) { 
      //  this.currentuser=this.auth.currentUser;
      this.loadOrdinateur();
     }

  ngOnInit(): void {
  }
  loadOrdinateur() {
    this.ordinateurlist = [];
    this.ordinateurService.getOrdinateurs().subscribe(data => {
      console.log("getUsers===================" + JSON.stringify(data));
      this.ordinateurlist = data;this.size=data.length;
      }, error => console.log(error));
    }
  async showDialog(id:number) {
    this.ordinateurdelete=new Ordinateur();
    this.id=this.activatedroute.snapshot.params['id'];
    this.ordinateurdelete= await this.ordinateurService.getOrdinateurByid(id).toPromise();
    console.log("iddelete========"+ this.ordinateurdelete.id)
    this.display = true;
    }
   
  updateOrdinateurForm(id: number) {
    this.router.navigate(['/ordinateurUpdate', id]);
  }
  createOrdinateurForm() {
    this.router.navigate(['/ordinateurCreate']);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  async deleteUser(id: number) {
    try {
      console.log("ordinateurdel======",this.ordinateurdelete);
      // console.log("usercurrent======",this.currentuser);
    //  if(this.userdelete.id===this.currentuser.id){
    //   this.messageService.add({key: 'tc', severity:'error', summary: 'Erreur', detail: "c'est l'utilisateur connécté"});
    //   this.display=false; 
    //   return;
    //  }
      await this.ordinateurService.deleteOrdinateur(id).toPromise();
      this.messageService.add({key:'tc',severity:'success', summary: 'Successful', detail: 'Utilisateur Supprimé avec succès'});
      this.loadOrdinateur();
      this.display=false;
    } catch (error) {
      console.error(error);
    }
  }
}
