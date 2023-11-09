import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'course-widgets',
  templateUrl: './course-widgets.component.html',
  styleUrls: ['./course-widgets.component.scss']
})
export class CourseWidgetsComponent implements OnInit {

  @Input() courseDetail:any
  @Output() removedCourse = new EventEmitter<any>();
  sidebarVisible: boolean = false;


  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){

  }

  ngOnInit(): void {
  }

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

  handleRemove(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this course?',
      header: 'Remove course',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.removeCourse()
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Removed course.' });
      },
      reject: () => {
      }
    });
  }

  removeCourse() {
    this.removedCourse.emit(this.courseDetail)
  }

}
