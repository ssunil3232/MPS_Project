import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent {

  @Input() courseDetail:any;

  @Output() courseSelection = new EventEmitter<any>();

  sidebarVisible: boolean = false;
  courseSelected: boolean = false;

  openFullDetail(){
    this.sidebarVisible = true;
  }

  checkCapacity(a:any, b:any){
    if(a === b){
      return "FULL";
    }
    else 
      return a+"/"+b+" Open";
  }

  formatTime(item:any){
    let newItem = moment(item, "HH:mm").format('h:mma');
    return newItem
  }

  courseSelect(item:any){
    this.courseSelection.emit({status: this.courseSelected, item: item});
  }

  formatDayString(item:any, isDay:boolean){
    let returnString = "";
    for(let i=0; i<item.length; i++){
      let el:any = item[i];
      if(isDay)
        returnString+= el.day;
      else 
        returnString+=item[i]
      if(i !== (item.length-1)){
        returnString+=", "
      }
    }
    return returnString;
  }

}
