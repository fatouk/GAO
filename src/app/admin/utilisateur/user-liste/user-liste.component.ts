import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-user-liste',
  templateUrl: './user-liste.component.html',
  styleUrls: ['./user-liste.component.scss']
})
export class UserListeComponent implements OnInit {
  userlist: any[] = [];
  items:any[]=[];
  display: boolean = false;
  userdelete: Utilisateur = new Utilisateur;
  id!: number;
  size!: number;
  currentuser!: Utilisateur;
  droit:boolean=false;
  selectUser!: Utilisateur[];
  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService,private confirmationmessage:ConfirmationService, private userService: UtilisateurService,
     private router: Router,private activatedroute:ActivatedRoute) { 
      //  this.currentuser=this.auth.currentUser;
      this.loadUsers();
     }

  ngOnInit(): void {
    // this.currentuser=this.auth.currentUser;
    // this.checkUser();
      this.loadUsers();
    }
  // checkUser(){
  //   if(this.currentuser===undefined || this.currentuser===null){
  //     this.router.navigate(['login']);
  //   }else{
  //     if(this.currentuser){
  //       this.droit=this.currentuser.profil===Dico.SUPERADMIN;
  //     }
  //   }
      
  // }
  loadUsers() {
    this.userlist = [];
    this.userService.getUsers().subscribe(data => {
      console.log("getUsers===================" + JSON.stringify(data));
      this.userlist = data;this.size=data.length;
      }, error => console.log(error));
    }
  async showDialog(id:number) {
    this.userdelete=new Utilisateur();
    this.id=this.activatedroute.snapshot.params['id'];
    this.userdelete= await this.userService.getUserByid(id).toPromise();
    console.log("id========"+ this.userdelete.id)
    this.display = true;
    }
   
  updateUserForm(id: number) {
    this.router.navigate(['/userUpdate', id]);
  }
  createUserForm() {
    this.router.navigate(['/userCreate']);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  deleteUser2() {
    this.confirmationmessage.confirm({
        message: 'Are you sure you want to delete '  + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // this.deleteUser(user.id);
            // this.products = this.products.filter(val => val.id !== product.id);
            this.selectUser == null;
            this.messageService.add({key: 'tc', severity:'error', summary: 'Erreur', detail: "c'est l'utilisateur connécté"});
            this.messageService.add({key:'tc',severity:'success', summary: 'Successful', detail: 'Product Deleted'});
        }
    });
}

  async deleteUser(id: number) {
    try {
      console.log("userdel======",this.userdelete);
      // console.log("usercurrent======",this.currentuser);
    //  if(this.userdelete.id===this.currentuser.id){
    //   this.messageService.add({key: 'tc', severity:'error', summary: 'Erreur', detail: "c'est l'utilisateur connécté"});
    //   this.display=false; 
    //   return;
    //  }
      await this.userService.deleteUser(id).toPromise();
      this.messageService.add({key:'tc',severity:'success', summary: 'Successful', detail: 'Utilisateur Supprimé avec succès'});
      this.loadUsers();
      this.display=false;
    } catch (error) {
      console.error(error);
    }
  }
}
