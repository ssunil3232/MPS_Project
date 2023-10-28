import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'registered-card',
  templateUrl: './registered-card.component.html',
  styleUrls: ['./registered-card.component.scss']
})
export class RegisteredCardComponent {

  @Input() courseDetail:any;

  @Output() courseRemoval = new EventEmitter<any>();

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService){}

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


  confirmDelete() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to unregister this course?',
        header: 'Unregister course',
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

}
