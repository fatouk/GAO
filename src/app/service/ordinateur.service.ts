import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordinateur } from '../model/Ordinateur';
import { ApiService } from './api.service';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class OrdinateurService {

  url:string="";
  constructor(private http:HttpClient,private constSrv:ConstService,private apiService:ApiService) {
    this.url=this.constSrv.getBaseUrl;
   }
getOrdinateurs():Observable<Ordinateur[]>{
    return this.http.get<Ordinateur[]>(this.url+"listAllOrdinateur");
  }
  getOrdinateurByid(id:number){
    return this.http.get<Ordinateur>(this.url+"oneOrdinateur/"+id);
  }
  getOrdinateurByStatus(status:string):Observable<Ordinateur[]>{
    return this.http.get<Ordinateur[]>(this.url+"listOrdinateur/"+status);
  }
  createOrdinateur(ordinateur:Ordinateur){
    return this.http.post(this.url+"saveOrdinateur",ordinateur);
  }

  updateOrdinateur(id:number,user:Ordinateur):Observable<Ordinateur>{
    return this.http.put<Ordinateur>(this.url+"updateOrdinateur/"+id,user);
  }
  deleteOrdinateur(id:number){
     return this.http.delete(this.url+"deleteOrdinateur/"+id);

  }
}
