import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnChanges{

  @Input() courseDetail: any;
  sidebarVisible: boolean = false;

  ngOnChanges(_changes: SimpleChanges): void {
      
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
