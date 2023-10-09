import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuickLinksService {

  constructor() { }

  dummyData = [
    {name: "Link 1", description: "http://google.com/"},
    {name: "Link 2", description: "http://google.com"},
    {name: "Link 3", description: "http://google.com"},
    {name: "Link 4", description: "http://google.com"},
    {name: "Link 5", description: "http://google.com"},
  ]

  getQuickLinks(){
    return this.dummyData;
  }

}
