import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Reservation } from 'src/app/model/Reservation';
import { Utilisateur } from 'src/app/model/Utilisateur';
import { ReservationService } from 'src/app/service/reservation.service';

@Component({
  selector: 'app-reservation-liste',
  templateUrl: './reservation-liste.component.html',
  styleUrls: ['./reservation-liste.component.scss']
})
export class ReservationListeComponent implements OnInit {
  reservationlist: any[] = [];
  items:any[]=[];
  display: boolean = false;
  reservationdelete: Reservation = new Reservation;
  id!: number;
  size!: number;
  currentuser!: Utilisateur;
  droit:boolean=false;
  selectReservation!: Reservation[];
  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService,private confirmationmessage:ConfirmationService, private reservationService:ReservationService,
     private router: Router,private activatedroute:ActivatedRoute) { 
      //  this.currentuser=this.auth.currentUser;
      
     }

  ngOnInit(): void {
    // this.currentuser=this.auth.currentUser;
    // this.checkUser();
      this.loadReservation();
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
  async loadReservation() {
    this.reservationlist = [];
     await this.reservationService.getReservations().subscribe(data => {
      console.log("getReservation===================" + JSON.stringify(data));
      this.reservationlist = data;
      this.size=data.length;
      }, error => console.log(error));
    }
  async showDialog(id:number) {
    this.reservationdelete=new Reservation();
    this.id=this.activatedroute.snapshot.params['id'];
    this.reservationdelete= await this.reservationService.getReservationByid(id).toPromise();
    console.log("id========"+ this.reservationdelete.id)
    this.display = true;
    }
   
  updateReservationForm(id: number) {
    // this.router.navigate(['/reservationUpdate', id]);
    this.redirectTo('reservationUpdate',id);
  }
  createReservationForm() {
    this.router.navigate(['/reservationCreate']);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  deleteReservation2() {
    this.confirmationmessage.confirm({
        message: 'Are you sure you want to delete '  + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // this.deleteUser(user.id);
            // this.products = this.products.filter(val => val.id !== product.id);
            this.selectReservation == null;
            this.messageService.add({key: 'tc', severity:'error', summary: 'Erreur', detail: "c'est Reservation connécté"});
            this.messageService.add({key:'tc',severity:'success', summary: 'Successful', detail: 'Product Deleted'});
        }
    });
}
redirectTo(uri:string,id:number){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri,id]));
}
  async deleteReservation(id: number) {
    try {
      console.log("Reservationdel======",this.reservationdelete);
      // console.log("usercurrent======",this.currentuser);
    //  if(this.userdelete.id===this.currentuser.id){
    //   this.messageService.add({key: 'tc', severity:'error', summary: 'Erreur', detail: "c'est l'utilisateur connécté"});
    //   this.display=false; 
    //   return;
    //  }
      await this.reservationService.deleteReservation(id).toPromise();
      this.messageService.add({key:'tc',severity:'success', summary: 'Successful', detail: 'Reservation Supprimée avec succès'});
      this.loadReservation();
      this.display=false;
    } catch (error) {
      console.error(error);
    }
  }

}
