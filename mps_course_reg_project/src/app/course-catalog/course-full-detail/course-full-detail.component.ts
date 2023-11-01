import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
  //@ViewChild('menu') menu: any;
  added: boolean = false;
  wishlisted: boolean = false;
  meetsPrereq: boolean = false;
  meetsRestrictions: boolean = false;
  restrictionMessage: any;
  prerequisites: any;
  userSchedules:any;
  addedSchedules: any = []

  showInputBoxFlag: boolean = false;
  inputText: string = '';
  saving: boolean = false; // Indicates if data is being saved
  buttonLabel: string = 'Save'; // Initial button label
  buttonIcon: string = 'pi pi-check'; // Initial button icon

  displayListbox: boolean = false;

  addCourseOptions: any[]  = [
    {
      label: 'Schedules',
      icon: "pi pi-calendar",
      command: (event:any) => this.displayListbox = true,
    },
    {
      label: 'New schedule',
      icon: "pi pi-plus",
      command: (event:any) => this.createSchedule()
    }
  ];


  // isSelected(node: any): boolean {
  //   return this.addedSchedules.indexOf(node) > -1;
  // }

  // updateSelected(event: any, node: any): void {
  //   if (event) {
  //     this.addedSchedules = [...this.addedSchedules, node];
  //   } else {
  //     this.addedSchedules = this.addedSchedules.filter((item:any) => item !== node);
  //   }
  // }

  isExistingItem(subjectCode:any, courseCode:any) {
    this.userSchedules.filter((item:any)=> {
      let data:any = item.data;
      data.filter((dataEl:any)=> {
        if(dataEl.subjectCode === subjectCode && dataEl.courseCode === courseCode){
          this.addedSchedules.push(item);
        }
      })

    })
  }

  addToSchedule(event:any){
    console.log("event", event)
    //update the following schedules in user profile
    //run user schedules fetch and isExisting check
  }

  createSchedule(){
    this.showInputBoxFlag = true;
  }

  errorMessage: any = '';
  isOnlyWhitespace(str:any) {
    return /^\s*$/.test(str);
  }

  startsWithWhiteSpace(str:any) {
    this.errorMessage = "Trailing white space detected."
    return /^\s/.test(str);
  }

  endsWithWhiteSpace(str:any) {
    this.errorMessage = "Trailing white space detected."
    return /\s$/.test(str);
  }

  validScheduleName(name:any){
    let exists = false;
    this.userSchedules.filter((item:any)=> {
      if(item.name === name){
        exists = true;
      }
    });
    this.errorMessage = "Schedule Name exists.";
    return exists;
  }

  saveInput() {
    console.log('Saved:', this.inputText);
    this.saving = true; 
    this.buttonLabel = 'Saving'; 
    this.buttonIcon = 'pi pi-spin pi-spinner';

    setTimeout(() => {
      this.saving = false;
      this.buttonLabel = 'Save';
      this.buttonIcon = 'pi pi-check';
      //check if valid
      //if invalid save, show message that existing name
      this.startsWithWhiteSpace(this.inputText);
      this.endsWithWhiteSpace(this.inputText);
      this.isOnlyWhitespace(this.inputText);
      this.validScheduleName(this.inputText);

    }, 2000);
    this.showInputBoxFlag = false;
    this.inputText = ""
  }
  


  constructor(public util: UtilService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      let user: any = this.util.getUserInfo();
      this.userSchedules = user.schedules;
      this.isExistingItem(this.courseDetail.subjectCode, this.courseDetail.courseCode);
      let courseD = this.courseDetail;
      this.added = courseD.added;
      this.wishlisted = courseD.wishlisted;
      this.prerequisites = courseD.prerequisites;
      this.checkingPrerequisite();
      this.checkRestrictions();
      this.prerequisites = this.prerequisites.reduce((result: any, item: any, index: any) => {
        if (index !== 0) {
          result += ', ';
        }
        return result + item;
      }, '');

    }
  }

  onDialogClose() {
    this.sidebarVisible = false;
    this.onClose.emit(this.sidebarVisible);
  }

  checkCapacity(a: any, b: any) {
    if (a === b) {
      return "FULL";
    }
    else
      return a + "/" + b + " Open";
  }

  checkingPrerequisite() {
    let user: any = this.util.getUserInfo();
    let coursesTaken: any = user.coursesTaken;
    let coursePrerequisite: any = this.courseDetail.prerequisites;
    let containsBoth = true;
    let containsItem = true;
    for (let i = 0; i < coursePrerequisite.length; i++) {
      let item: any = coursePrerequisite[i];
      if (item.includes('and')) {
        const elements = item.split('and').map((it: any) => it.trim());
        containsBoth = elements.every((it: any) => coursesTaken.includes(it));
      }
      else {
        containsItem = coursesTaken.includes(item);
      }
    }
    if (containsBoth || containsItem)
      this.meetsPrereq = true;
  }

  checkRestrictions() {
    let user: any = this.util.getUserInfo();
    let department: any = user.department;
    let courseRestriction: any = this.courseDetail.restrictions;
    this.restrictionMessage = "This course is only for " + courseRestriction + " students."
    for (let i = 0; i < courseRestriction?.length; i++) {
      let item: any = courseRestriction[i];
      if (item === department) {
        this.meetsRestrictions = true;
        break;
      }
    }
  }

  addRemoveWishlist() {
    this.onWishlistChange.emit({ wishlisted: this.wishlisted, course: this.courseDetail });
  }

  addRemoveCourse() {
    this.onAddChange.emit({ added: this.added, course: this.courseDetail });
  }

}
