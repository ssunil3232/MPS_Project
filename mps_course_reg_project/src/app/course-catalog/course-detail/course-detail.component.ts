import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnChanges{

  @Input() courseDetail: any;
  @Output() wishlistedCourse = new EventEmitter<any>();
  @Output() addedCourse = new EventEmitter<any>();
  sidebarVisible: boolean = false;

  ngOnChanges(_changes: SimpleChanges): void {
      
  }

  onAddChange(event:any){
    this.addedCourse.emit(event);
  }

  onWishlistChange(event:any){
    this.wishlistedCourse.emit(event);
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
}
