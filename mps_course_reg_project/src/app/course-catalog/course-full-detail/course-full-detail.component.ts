import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'course-full-detail',
  templateUrl: './course-full-detail.component.html',
  styleUrls: ['./course-full-detail.component.scss']
})
export class CourseFullDetailComponent implements OnChanges {
  @Input() sidebarVisible: boolean = false;
  @Output() onClose = new EventEmitter<any>();
  @Input() courseDetail: any;
  added: boolean = false;
  wishlisted: boolean = false;

  ngOnChanges(_changes: SimpleChanges): void {
  
  }

  onDialogClose(){
    this.sidebarVisible = false;
    this.onClose.emit(this.sidebarVisible);
  }

  checkCapacity(a:any, b:any){
    if(a === b){
      return "FULL";
    }
    else 
      return a+"/"+b+" Open";
  }

}
