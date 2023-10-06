import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  user:any;

  getUserInfo(){
    this.user = {
      name: "Claire",
      course: "MPS Information Science",
      university: "Cornell University"
    }
    return this.user;
  }
}
