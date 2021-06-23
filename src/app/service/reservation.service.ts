import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';
import { ApiService } from './api.service';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url:string="";
  constructor(private http:HttpClient,private constSrv:ConstService,private apiService:ApiService) {
    this.url=this.constSrv.getBaseUrl;
   }
getReservations():Observable<Reservation[]>{  
    return this.http.get<Reservation[]>(this.url+"listReservation");
  }
  getReservationByid(id:number){
    return this.http.get<Reservation>(this.url+"oneReservation/"+id);
  }
  getReservationByID(id:number){
    return this.http.get(this.url+"oneReservation/"+id);
  }
 
  createReservation(reservation:Reservation){
    return this.http.post(this.url+"saveReservation",reservation);
  }

  updateReservation(id:number,reservation:Reservation):Observable<Reservation>{
    return this.http.put<Reservation>(this.url+"updateReservation/"+id,reservation);
  }
  deleteReservation(id:number){
      return this.http.delete(this.url+"deleteReservation/"+id);

  }
}
