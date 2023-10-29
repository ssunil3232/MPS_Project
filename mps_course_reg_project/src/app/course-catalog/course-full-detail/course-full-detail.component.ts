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
  meetsPrereq: boolean = false;
  meetsRestrictions: boolean = false;
  restrictionMessage:any;

  constructor(public util:UtilService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      let courseD = this.courseDetail;
      this.added = courseD.added;
      this.wishlisted = courseD.wishlisted;
      this.checkingPrerequisite();
      this.checkRestrictions();
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

  checkingPrerequisite(){
    let user:any = this.util.getUserInfo();
    let coursesTaken:any = user.coursesTaken;
    let coursePrerequisite:any = this.courseDetail.prerequisites;
    let containsBoth = true;
    let containsItem = true;
    for(let i=0; i<coursePrerequisite.length; i++){
      let item:any = coursePrerequisite[i];
      if (item.includes('and')) {
        const elements = item.split('and').map((it:any) => it.trim());
        containsBoth = elements.every((it:any) => coursesTaken.includes(it));
      }
      else {
        containsItem = coursesTaken.includes(item);
      }
    }
    if(containsBoth || containsItem)
      this.meetsPrereq = true;
  }

  checkRestrictions(){
    let user:any = this.util.getUserInfo();
    let department:any = user.department;
    let courseRestriction:any = this.courseDetail.restrictions;
    this.restrictionMessage = "This course is only for "+courseRestriction+ " students."
    for(let i=0; i<courseRestriction?.length; i++){
      let item:any = courseRestriction[i];
      if(item === department){
        this.meetsRestrictions = true;
        break;
      }
    }
  }

  addRemoveWishlist(){
    this.onWishlistChange.emit({wishlisted: this.wishlisted, course:this.courseDetail});
  }

  addRemoveCourse(){
    this.onAddChange.emit({added: this.added, course:this.courseDetail});
  }

}
