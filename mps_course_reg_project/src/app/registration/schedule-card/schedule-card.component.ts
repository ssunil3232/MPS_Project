import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnChanges{

  @Input() courseDetail:any;

  @Output() courseSelection = new EventEmitter<any>();

  constructor(
    private messageService: MessageService
  ) {

  }

  sidebarVisible: boolean = false;
  courseSelected: boolean = false;
  errorDetail = { severity: 'error', detail: "" }
  errorMessage: Message[] = []

  openFullDetail(){
    this.sidebarVisible = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.courseDetail.errorMessage){
        this.errorDetail.detail = this.courseDetail.errorMessage;
        this.errorMessage = [this.errorDetail];
      }
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
