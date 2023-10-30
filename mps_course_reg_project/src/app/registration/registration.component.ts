import { Component, OnInit } from '@angular/core';
import { user_schedules } from "../data";
import { UtilService } from '../util.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { registration_course } from "../data";
import { Message } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: any;
  registrationStartDateTime: any;
  registrationEndDateTime: any;
  nowDateTime: any;

  meetsPrereq: boolean = false;
  meetsRestrictions: boolean = false;
  restrictionMessage:any;

  registeredCourses: any = [] //need to remove once we can populate from backend
  waitlistedCourses: any = []  //this too

  menuItems: any = [
    { label: "Registered Courses", key: 'R' },
    { label: "Waitlisted Courses", key: 'W' }
  ]
  selectedMenuItem: any = this.menuItems[0];

  errorMessage: Message[] = []

  validRegistrationWindow: boolean = false;

  sidebarVisible: boolean = false;

  constructor(
    public util: UtilService,
    private messageService: MessageService
  ) {

  }

  openHelper(){
    this.sidebarVisible = true;
  }

  onActiveItemChange(event: any) {
    this.selectedMenuItem = event;
  }

  ngOnInit(): void {
    this.user = this.util.getUserInfo();
    this.registrationStartDateTime = moment(this.user.registrationStartDateTime, "YYYY-MM-DD HH:mm:ss").format();
    this.registrationEndDateTime = moment(this.user.registrationEndDateTime, "YYYY-MM-DD HH:mm:ss").format();
    this.nowDateTime = moment();
    this.validRegistrationWindow = this.nowDateTime.isBetween(this.registrationStartDateTime, this.registrationEndDateTime)

    this.registeredCourses = this.user.registeredClasses;
    this.waitlistedCourses = this.user.waitlistedClasses;
    //scheduler dropdown show the DIFF between registered &
    //waitlisted classes !!!!!!!!!!!!!!!!!!!!!!!!
    this.populateCourses()
  }

  scheduleData = user_schedules;
  selectedScheduleData: any = null;

  schedules: any[] = [
    { name: "Schedule A", value: "a" },
    { name: "Schedule B", value: "b" },
    { name: "Schedule C", value: "c" },
  ]
  selectedSchedule: any;

  registerLoading: boolean = false;

  populateCourses() {
    //where we will get the schedule data and populate the "unregistered" && "unwaitlisted" courses

  }

  checkingPrerequisite(){
    let user:any = this.util.getUserInfo();
    let coursesTaken:any = user.coursesTaken;
    let containsBoth = true;
    let containsItem = true;
    for(let i=0; i<this.selectedCoursesToRegister.length; i++) {
      let course:any = this.selectedCoursesToRegister[i];
      let coursePrerequisite:any = course.prerequisites;
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

      if(!this.meetsPrereq)
        break;
    
    }
  }

  // checkRestrictions(){
  //   let user:any = this.util.getUserInfo();
  //   let department:any = user.department;
  //   let courseRestriction:any = this.courseDetail.restrictions;
  //   this.restrictionMessage = "This course is only for "+courseRestriction+ " students."
  //   for(let i=0; i<courseRestriction.length; i++){
  //     let item:any = courseRestriction[i];
  //     if(item === department){
  //       this.meetsRestrictions = true;
  //       break;
  //     }
  //   }
  // }

  calculateTotalCredits(){
    let sum = 0;
    for(let i=0; i< this.registeredCourses.length; i++){
      let course = this.registeredCourses[i];
      sum += course.credits;
    }
    return sum;
  }

  registering() {
    if (this.selectedCoursesToRegister.length > 0) {
      if (this.validRegistrationWindow) {
        this.registerLoading = true;

        setTimeout(() => {
          //post request
          //based on capacity evaluation,
          console.log("this.selectedCoursesToRegister", this.selectedCoursesToRegister)

          let returnData = registration_course;
          //success
          let success = returnData.filter((obj: any) => obj["status"] === "success")
          if (success.length > 0) {
            let successLength = success[0]["data"].length;
            //check if the courses in it are in the registered courses and return only the ones not yet.
            this.registeredCourses = [...this.registeredCourses, ...success[0]["data"]];
            this.showToast({ severity: 'success', message: successLength + success[0]["message"] });
          }

          //waitlist
          let waitlist = returnData.filter((obj: any) => obj["status"] === "waitlist")
          if (waitlist.length > 0) {
            let waitlistLength = waitlist[0]["data"].length;
            this.waitlistedCourses = [...this.waitlistedCourses, ...waitlist[0]["data"]];
            this.showToast({ severity: 'warn', message: waitlistLength + waitlist[0]["message"] });
          }

          //unsuccess
          let unsuccess = returnData.filter((obj: any) => obj["status"] === "unsuccess")
          this.errorMessage = [];
          if (unsuccess.length > 0) {
            for(let i=0; i< unsuccess[0]["message"].length; i++){
              let error = unsuccess[0]["message"][i];
              this.errorMessage.push({ severity: 'error', detail: error });

            }
            //this.errorMessage = [{ severity: 'error', detail: unsuccess[0]["message"] }];
          }
          //on success, waitlist --> remove from scheduler view? but would that impact scheduler? if i
          //click sccheduler again will it show? --> scheduler dropdown show the DIFF between registered &
          //waitlisted classes !!!!!!!!!!!!!!!!!!!!!!!!
          //repopulate with selected schedule --> should retrieve the difference
          this.populateCourses()
          this.registerLoading = false
        }, 2000);
      }
      else {
        this.showToast({ severity: 'error', message: 'Your registration window is not open.' })
      }
    }

  }

  selectedCoursesToRegister: any = []

  courseSelected(event: any) {
    let exists = this.selectedCoursesToRegister.some((obj: any) =>
      obj["subjectCode"] === event.item["subjectCode"] && obj["courseCode"] === event.item["courseCode"])
    if (event.status) {
      if (!exists) {
        this.selectedCoursesToRegister.push(event.item)
      }
    }
    else {
      if (exists) {
        this.selectedCoursesToRegister = this.selectedCoursesToRegister.filter((obj: any) => !(obj["courseCode"] === event.item["courseCode"] && obj["subjectCode"] === event.item["subjectCode"]));
      }
    }
  }

  courseRemoval(event:any){
    //to rerun user fetch
  }

  scheduleChange() {
    let scheduleId: any = this.selectedSchedule["value"];
    this.selectedScheduleData = this.scheduleData[scheduleId]
  }

  formatDateTime(dateTime: any) {
    return moment(dateTime).format("MMMM Do, YYYY h:mma");
  }

  showToast(eventState: any) {
    this.messageService.add({ severity: eventState.severity, detail: eventState.message });
  }

}
