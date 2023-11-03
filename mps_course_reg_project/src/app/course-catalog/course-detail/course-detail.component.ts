import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

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
  dayString:any = "";

  ngOnChanges(_changes: SimpleChanges): void {
      
  }

  onAddChange(event:any){
    this.addedCourse.emit(event);
  }

  onWishlistChange(event:any){
    this.wishlistedCourse.emit(event);
  }

  formatTime(item:any){
    let newItem = moment(item, "HH:mm").format('h:mma');
    return newItem
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
