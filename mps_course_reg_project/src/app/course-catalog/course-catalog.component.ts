import { Component, OnInit } from '@angular/core';
import { course_catalog } from '../data';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-course-catalog',
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.scss']
})
export class CourseCatalogComponent implements OnInit {

  searchValue: any;
  searchPlaceholder = "Enter course number, instructor name, major, keywords";
  courseList = course_catalog;

  ngOnInit(): void {
      console.log("data", this.courseList)
  }

  constructor(public util: UtilService) { }

  wishlistedCourse(event:any){
    this.courseList.data.forEach(element => {
      if(element.courseCode === event.course.courseCode){
        element.wishlisted = event.wishlisted;
      }
    });
    let wishlistData:any = this.util.getDataLocal('wishlist') || new Array();
    if(event.wishlisted){ 
      let item_index = -1;
      if(wishlistData.length > 0){
        item_index = wishlistData.forEach((e:any, index:any) => {
          if(e.courseCode === event.course.courseCode){
            return index;
          }
        });
      }
      if(item_index === -1)
        wishlistData.push(event.course)
    }
    if(!event.wishlisted){ 
      let item_index = -1;
      if(wishlistData.length > 0){
        item_index = wishlistData.forEach((e:any, index:any) => {
          if(e.courseCode === event.course.courseCode){
            return index;
          }
        });
      }
      if(item_index !== -1)
        wishlistData = wishlistData.splice(item_index, 1)
    }
    console.log("wishlistAdded", wishlistData)
    this.util.saveDataLocal('wishlist', JSON.stringify(wishlistData));
  }

  addedCourse(event:any){
    this.courseList.data.forEach(element => {
      if(element.courseCode === event.course.courseCode){
        element.added = event.added;
      }
    });
    let addedData:any = this.util.getDataLocal('added') || [];
    if(event.added){ 
      if (!addedData.find((e:any) => e.courseCode === event.course.courseCode)) {
        addedData.push(event.course)
      }   
    }
    if(!event.added){ 
      const i = addedData.findIndex((e:any) => e.courseCode === event.course.courseCode);
      if (i > -1) {
        addedData = addedData.splice(i, 1)
      } 
    }
    this.util.saveDataLocal('added', addedData)
    //should ideally save to DB and pull on ngOnInit
  }

}
