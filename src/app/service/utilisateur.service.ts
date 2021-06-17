import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { ApiService } from './api.service';
import { ConstService } from './const.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url:string="";
  constructor(private http:HttpClient,private constSrv:ConstService,private apiService:ApiService) {
    this.url=this.constSrv.getBaseUrl;
   }
getUsers():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.url+"listuser");
  }
  getUserByid(id:number){
    return this.http.get<Utilisateur>(this.url+"one/"+id);
  }
//   getUserByID(id:number){
//     return this.http.get(this.url+"one/"+id);
//   }
 
  createUser(user:Utilisateur){
    return this.http.post(this.url+"saveuser",user);
  }

  updateUser(id:number,user:Utilisateur):Observable<Utilisateur>{
    return this.http.put<Utilisateur>(this.url+"updateuser/"+id,user);
  }
  deleteUser(id:number){
     return this.http.delete(this.url+"onedelete/"+id);

  }



  // getUsers():Observable<Utilisateur[]>{
  //   return this.apiService.get("listuser") as any;
  // }
  // getUserByid(id:number){
  //   return this.apiService.get("one/"+id) as any;
  // }
  getUserByID(id:number){
    return this.apiService.get("one/"+id);
  }
 
  // createUser(user:Utilisateur){
  //   return this.apiService.post("saveuser",user);
  // }

  // updateUser(id:number,user:Utilisateur):Observable<Utilisateur>{
  //   return this.apiService.put("updateuser/"+id,user) as any;
  // }
  // deleteUser(id:number){
  //     return this.apiService.delete("onedelete/"+id);

  // }

}
