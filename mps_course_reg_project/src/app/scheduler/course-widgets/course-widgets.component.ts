import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'course-widgets',
  templateUrl: './course-widgets.component.html',
  styleUrls: ['./course-widgets.component.scss']
})
export class CourseWidgetsComponent implements OnInit {

  @Input() courseDetail:any
  sidebarVisible: boolean = false;

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

}
