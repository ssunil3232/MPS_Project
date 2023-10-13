import { Component, OnInit } from '@angular/core';
import { course_catalog } from '../data';

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
      
  }

}
