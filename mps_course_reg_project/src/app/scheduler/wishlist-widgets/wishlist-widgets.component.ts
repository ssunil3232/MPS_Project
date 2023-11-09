import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wishlist-widgets',
  templateUrl: './wishlist-widgets.component.html',
  styleUrls: ['./wishlist-widgets.component.scss']
})
export class WishlistWidgetsComponent {

  @Input() courseDetail:any
  @Output() addCourse = new EventEmitter<any>();

  checkCapacity(a:any, b:any){
    if(a === b){
      return "FULL";
    }
    else 
      return a+"/"+b+" Open";
  }

  addingCourse() {
    this.addCourse.emit(this.courseDetail)
  }

}
