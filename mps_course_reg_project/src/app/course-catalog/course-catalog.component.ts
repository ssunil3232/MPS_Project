import { Component, OnInit } from '@angular/core';
import { course_catalog } from '../data';
import { UtilService } from '../util.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

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

  constructor(public util: UtilService) { }

  instructorOptions = [
    "Sharlene Cleare",
    "Gilly Leshed"
  ]

  academicGroups: any = [
    { name: "Information Science", code: "INFO" },
    { name: "Computer Science", code: "CS" },
    { name: "Business", code: "NBA" },
    { name: "Architecture", code: "ARCH" },
  ]
  academicLevels: any = [
    { name: "Graduate", code: "Graduate" },
    { name: "Junior", code: "Junior" },
    { name: "Senior", code: "Senior" },
    { name: "Freshman", code: "Freshman" },
    { name: "Sophomore", code: "Sophomore" },
  ]
  dayOfWeek: any = [
    { name: "Monday", code: "Mon" },
    { name: "Tuesday", code: "Tue" },
    { name: "Wednesday", code: "Wed" },
    { name: "Thursday", code: "Thu" },
    { name: "Friday", code: "Fri" },
  ]
  timeOffered: any = [
    { name: "Early morning (before 10AM)", code: "07:00-10:00" },
    { name: "Morning (10AM-noon)", code: "10:00-12:00" },
    { name: "Lunchtime (noon-2PM)", code: "12:00-14:00" },
    { name: "Afternoon (2PM-5PM)", code: "14:00-17:00" },
    { name: "Evening (5PM-8PM)", code: "17:00-20:00" },
  ]
  classLevel: any = [
    { name: "Level 1000", code: "1000" },
    { name: "Level 2000", code: "2000" },
    { name: "Level 3000", code: "3000" },
    { name: "Level 4000", code: "4000" },
    { name: "Level 5000", code: "5000" },
    { name: "Level 6000", code: "6000" },
    { name: "Level 7000", code: "7000" },
  ]
  campus: any = [
    { name: "Ithaca Campus", code: "Ihaca" },
    { name: "New York Campus", code: "NY" },
  ]
  credits: any = [
    { name: "0-1", code: "0-1" },
    { name: "1 credit", code: "1" },
    { name: "2 credits", code: "2" },
    { name: "3 credits", code: "3" },
    { name: "4 credits", code: "4" },
    { name: "5 credits", code: "5" },
    { name: "6+ credits", code: ">=6" },
  ]
  instructionMode: any = [
    { name: "Directed Research", code: "Directed Research" },
    { name: "Distance Learning-Asynchronous", code: "Distance Learning-Asynchronous" },
    { name: "Distance Learning-Synchronous", code: "Distance Learning-Synchronous" },
    { name: "Hybrid-Online and In Person", code: "Hybrid-Online and In Person" },
    { name: "In Person", code: "In Person" },
    { name: "Independent Studies", code: "Independent Studies" },
    { name: "Online", code: "Online" }
  ]
  selectedAcademicGroups: any = [];

  items = [
    {
      label: 'Academic Group',
      options: this.academicGroups,
      selectAllItems: false,
      selectedGroup: []
    },
    {
      label: 'Academic Level',
      options: this.academicLevels,
      selectAllItems: false,
      selectedGroup: []
    },
    {
      label: 'Time Offered',
      options: this.timeOffered,
      selectAllItems: false,
      selectedGroup: []
    }, //timings are varied? so how
    {
      label: 'Day of Week',
      options: this.dayOfWeek,
      selectAllItems: false,
      selectedGroup: []
    },
    {
      label: 'Class Level',
      options: this.classLevel,
      selectAllItems: false,
      selectedGroup: []
    },
    {
      label: 'Campus',
      options: this.campus,
      selectAllItems: false,
      selectedGroup: []
    },
    //{ label: 'Location' },//skip
    //{ label: 'Keywords' },//skip not sure
    {
      label: 'Credits',
      options: this.credits,
      selectAllItems: false,
      selectedGroup: []
    }, //Course credits or length
    {
      label: 'Instructor',
      options: [],
      selectedGroup: []
    },
    {
      label: 'Instruction Mode',
      options: this.instructionMode,
      selectAllItems: false,
      selectedGroup: []
    },
    //{ label: 'Grading Mode' } //to check with UX
  ];
  instructors: any[] = [];

  searchInstructors(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.instructorOptions as any[]).length; i++) {
      let inst = (this.instructorOptions as any[])[i];
      if (inst.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(inst);
      }
    }
    this.instructors = filtered;
  }

  filterChanged(item: any) {
    if (item.selectedGroup.length !== item.options.length) {
      item.selectAllItems = false;
    }
    else {
      item.selectAllItems = true;
    }
  }

  onAddRemoveChip(item: any) {
    if (item.selectedGroup.length !== item.options.length) {
      item.selectAllItems = false;
    }
    else {
      item.selectAllItems = true;
    }
  }

  //selectAllItems: any

  selectAll(item: any) {
    if (item.selectAllItems) {
      this.items.filter((el: any) => {
        if (el.label === item.label) {
          el.selectedGroup = item.options;
        }
      })
    }
    else {
      this.items.filter((el: any) => {
        if (el.label === item.label) {
          el.selectedGroup = [];
        }
      })
    }
  }

  clearAll(){
    this.items.map((item:any)=> {
      item.selectedGroup = [];
      item.selectAllItems = false;
    })
  }

  wishlistedCourse(event: any) {
    this.courseList.data.forEach(element => {
      if (element.courseCode === event.course.courseCode) {
        element.wishlisted = event.wishlisted;
      }
    });
    let wishlistData: any = this.util.getDataLocal('wishlist') || new Array();
    if (event.wishlisted) {
      let item_index = -1;
      if (wishlistData.length > 0) {
        item_index = wishlistData.forEach((e: any, index: any) => {
          if (e.courseCode === event.course.courseCode) {
            return index;
          }
        });
      }
      if (item_index === -1)
        wishlistData.push(event.course)
    }
    if (!event.wishlisted) {
      let item_index = -1;
      if (wishlistData.length > 0) {
        item_index = wishlistData.forEach((e: any, index: any) => {
          if (e.courseCode === event.course.courseCode) {
            return index;
          }
        });
      }
      if (item_index !== -1)
        wishlistData = wishlistData.splice(item_index, 1)
    }
    this.util.saveDataLocal('wishlist', JSON.stringify(wishlistData));
  }

  addedCourse(event: any) {
    this.courseList.data.forEach(element => {
      if (element.courseCode === event.course.courseCode) {
        element.added = event.added;
      }
    });
    let addedData: any = this.util.getDataLocal('added') || [];
    if (event.added) {
      if (!addedData.find((e: any) => e.courseCode === event.course.courseCode)) {
        addedData.push(event.course)
      }
    }
    if (!event.added) {
      const i = addedData.findIndex((e: any) => e.courseCode === event.course.courseCode);
      if (i > -1) {
        addedData = addedData.splice(i, 1)
      }
    }
    this.util.saveDataLocal('added', addedData)
    //should ideally save to DB and pull on ngOnInit
  }

}
