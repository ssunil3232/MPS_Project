import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'course-full-detail',
  templateUrl: './course-full-detail.component.html',
  styleUrls: ['./course-full-detail.component.scss']
})
export class CourseFullDetailComponent implements OnChanges {
  @Input() sidebarVisible: boolean = false;
  @Input() showAddButton?: boolean = true;
  @Output() onClose = new EventEmitter<any>();
  @Output() onWishlistChange = new EventEmitter<any>();
  @Output() onAddChange = new EventEmitter<any>();
  @Input() courseDetail: any;
  added: boolean = false;
  wishlisted: boolean = false;

  constructor(public util:UtilService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      let courseD = this.courseDetail;
      this.added = courseD.added;
      this.wishlisted = courseD.wishlisted;
    }
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

  addRemoveWishlist(){
    this.onWishlistChange.emit({wishlisted: this.wishlisted, course:this.courseDetail});
  }

  addRemoveCourse(){
    this.onAddChange.emit({added: this.added, course:this.courseDetail});
  }

}
