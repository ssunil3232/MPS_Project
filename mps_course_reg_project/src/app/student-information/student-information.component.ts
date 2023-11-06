import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss']
})
export class StudentInformationComponent implements OnInit {

  selectedSemester:any;
  semesters:any = [];
  user:any
  creditSum:any = 0;

  constructor(public util: UtilService,){}

  ngOnInit(): void {
      this.user =  this.util.getUserInfo();
      this.semesters = this.user.courseHistory;
      this.selectedSemester = this.semesters[0]
      this.getSemesterCredits()
  }

  getSemesterCredits(){
    let sum = 0;
    for(let i=0; i<this.selectedSemester.courses.length; i++){
      let course = this.selectedSemester.courses[i];
      console.log(course)
      sum += course.credits;
    }
    this.creditSum = sum;
  }

  openEmailDraft() {
    const email = this.user.advisorInfo.email;
    const subject = '';
    const body = '';
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  }

}
