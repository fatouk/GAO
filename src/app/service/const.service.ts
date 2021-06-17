import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {

  constructor() { }
  get getBaseUrl(){
     return "http://localhost:8080/api/";
     }
}
