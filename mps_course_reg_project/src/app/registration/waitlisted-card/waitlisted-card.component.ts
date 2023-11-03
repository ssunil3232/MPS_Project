import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'waitlisted-card',
  templateUrl: './waitlisted-card.component.html',
  styleUrls: ['./waitlisted-card.component.scss']
})
export class WaitlistedCardComponent {

  @Input() courseDetail: any;

  @Output() courseRemoval = new EventEmitter<any>();

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  sidebarVisible: boolean = false;
  courseSelected: boolean = false;

  openFullDetail() {
    this.sidebarVisible = true;
  }

  formatTime(item: any) {
    let newItem = moment(item, "HH:mm").format('h:mma');
    return newItem
  }


  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you do not want to waitlist this course?',
      header: 'Remove course from waitlist',
      icon: 'pi pi-info-circle',
      accept: () => {
        //if remove here--> send to backedn and then on success print the dialog
        //send to previous screen to rerun fetch of user registered classes
        this.courseRemoval.emit();
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Removed registered course.' });
      },
      reject: () => {
      }
    });
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
