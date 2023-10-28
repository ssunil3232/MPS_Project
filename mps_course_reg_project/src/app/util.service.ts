import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  user:any;

  public saveDataLocal(key:string, value:string){
    localStorage.setItem(key, value);
  }

  public getDataLocal(key:string){
    return localStorage.getItem(key);
  }

  getUserInfo(){
    this.user = {
      name: "Claire",
      course: "MPS Information Science",
      university: "Cornell University",
      registrationStartDateTime: "2023-08-27 07:30:00",
      registrationEndDateTime: "2023-12-02 07:30:00",
      registeredClasses: [
        {
          subjectCode: "INFO",
          courseCode: "1035",
          title: "Information, Ethics, Law, and Policy",
          credits: 3,
          prerequisites: ["INFO 3200", "INFO 2001"],
          workload: {
              hours: 10,
              lecture: 2,
              assignment: 4,
              project: 4
          },
          offered: ["Fall, Spring, Summer, Winter"],
          description: "This course investigates the ethical, legal, and policy foundations of contemporary information technology. Through lectures, readings, discussions, and short assignments, we will address contemporary challenges ranging from privacy in big data and social computing to the nature of innovation, property, and collaboration in a networked world. We will cover key areas of technology law and policy such as telecommunications and network policy; concentration and antitrust; free speech and the first amendment; intellectual property; and privacy, security and freedom of information. We will also address new ethical questions and controversies that law and policy has yet to sort out. Through this course you'll learn about the key frameworks, processes, and institutions that govern the contemporary world of technology, along with key theories and methods from the academic fields that shape and inform them (law, philosophy, economics, political science, communication, sociology, etc.). You'll also learn core writing and analytic skills central to success in the worlds of social science, law, policy, and many other settings. But above all you'll learn to engage critically and strategically with the worlds of information and technology around you, deciding what kind of information consumer, user, and citizen YOU want to be.",
          lectureDetail: {
              prefix: "LEC",
              lectureId: "003",
              dayTimes: [
                  {
                      day: "Mon",
                      startTime: "13:25",
                      endTime: "14:15",
                      location: "Statler Hall 185-Aud",
                      selected: true
                  },
                  {
                      day: "Wed",
                      startTime: "13:25",
                      endTime: "14:25",
                      location: "Statler Hall 185-Aud",
                      selected: true
                  }
              ],
              lecturers: ["Susser, D", "Diana, N"],
              classFormat: "In-person",
              capacity: 50,
              vacancy: 11
          },
          discussionDetail: {
              prefix: "DIS",
              discussionId: "201",
              dayTimes: [
                  {
                      day: "Tue",
                      startTime: "10:10",
                      endTime: "11:00",
                      location: "Hollister Hall 401",
                      selected: true
                  },
                  {
                      day: "Thu",
                      startTime: "10:10",
                      endTime: "11:00",
                      location: "Hollister Hall 401",
                      selected: false
                  }
              ],
              lecturers: ["Susser, D", "Vidan, G"],
              classFormat: "In-person",
              capacity: 50,
              vacancy: 50,
          },
          wishlisted: true,
          added: false
      },
      ],
      waitlistedClasses: [
        {
          subjectCode: "INFO",
          courseCode: "1200",
          title: "Information, Ethics, Law, and Policy",
          credits: 3,
          position: 11,
          totalWaitlisted: 50,
          prerequisites: ["INFO 3200", "INFO 2001"],
          workload: {
              hours: 10,
              lecture: 2,
              assignment: 4,
              project: 4
          },
          offered: ["Fall, Spring, Summer, Winter"],
          description: "This course investigates the ethical, legal, and policy foundations of contemporary information technology. Through lectures, readings, discussions, and short assignments, we will address contemporary challenges ranging from privacy in big data and social computing to the nature of innovation, property, and collaboration in a networked world. We will cover key areas of technology law and policy such as telecommunications and network policy; concentration and antitrust; free speech and the first amendment; intellectual property; and privacy, security and freedom of information. We will also address new ethical questions and controversies that law and policy has yet to sort out. Through this course you'll learn about the key frameworks, processes, and institutions that govern the contemporary world of technology, along with key theories and methods from the academic fields that shape and inform them (law, philosophy, economics, political science, communication, sociology, etc.). You'll also learn core writing and analytic skills central to success in the worlds of social science, law, policy, and many other settings. But above all you'll learn to engage critically and strategically with the worlds of information and technology around you, deciding what kind of information consumer, user, and citizen YOU want to be.",
          lectureDetail: {
              prefix: "LEC",
              lectureId: "003",
              dayTimes: [
                  {
                      day: "Mon",
                      startTime: "13:25",
                      endTime: "14:15",
                      location: "Statler Hall 185-Aud",
                      selected: true
                  },
                  {
                      day: "Wed",
                      startTime: "13:25",
                      endTime: "14:25",
                      location: "Statler Hall 185-Aud",
                      selected: true
                  }
              ],
              lecturers: ["Susser, D", "Diana, N"],
              classFormat: "In-person",
              capacity: 50,
              vacancy: 11
          },
          discussionDetail: {
              prefix: "DIS",
              discussionId: "201",
              dayTimes: [
                  {
                      day: "Tue",
                      startTime: "10:10",
                      endTime: "11:00",
                      location: "Hollister Hall 401",
                      selected: true
                  },
                  {
                      day: "Thu",
                      startTime: "10:10",
                      endTime: "11:00",
                      location: "Hollister Hall 401",
                      selected: false
                  }
              ],
              lecturers: ["Susser, D", "Vidan, G"],
              classFormat: "In-person",
              capacity: 50,
              vacancy: 50,
          },
          wishlisted: true,
          added: false
      },

      ],
      currentTerm: "Fall 2023",
      schedule: [
        {id: "19533", courseId: "INFO 5001", type: "LEC", day: "Mon", start: "11:40", end: "12:05", location: "Upson Hall" },
        {id: "19533", courseId: "INFO 5001", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Philips Hall" },
        {id: "19523", courseId: "INFO 5101", type: "LEC", day: "Thu", start: "11:40", end: "12:05", location: "Rhodes Hall" },
        {id: "19523", courseId: "INFO 5101", type: "LEC", day: "Fri", start: "14:30", end: "15:30", location: "Upson Hall" },
        {id: "19511", courseId: "INFO 5332", type: "LEC", day: "Mon", start: "11:40", end: "12:05", location: "Gates Hall" },
        {id: "19511", courseId: "INFO 5332", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Upson Hall" },
        {id: "19501", courseId: "INFO 5112", type: "LEC", day: "Tue", start: "11:40", end: "12:05", location: "Duffield Hall" },
        {id: "19501", courseId: "INFO 5112", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Upson Hall" },
        {id: "19533", courseId: "INFO 5001", type: "LEC", day: "Mon", start: "11:40", end: "12:05", location: "Upson Hall" },
        {id: "19533", courseId: "INFO 5001", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Philips Hall" },
        {id: "19523", courseId: "INFO 5101", type: "LEC", day: "Thu", start: "11:40", end: "12:05", location: "Rhodes Hall" },
        {id: "19523", courseId: "INFO 5101", type: "LEC", day: "Fri", start: "14:30", end: "15:30", location: "Upson Hall" },
        {id: "19511", courseId: "INFO 5332", type: "LEC", day: "Mon", start: "11:40", end: "12:05", location: "Gates Hall" },
        {id: "19511", courseId: "INFO 5332", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Upson Hall" },
        {id: "19501", courseId: "INFO 5112", type: "LEC", day: "Tue", start: "11:40", end: "12:05", location: "Duffield Hall" },
        {id: "19501", courseId: "INFO 5112", type: "LEC", day: "Wed", start: "14:30", end: "15:30", location: "Upson Hall" }
      ]
    }
    return this.user;
  }

  formatTime(item:any){
    let newItem = moment(item, "HH:mm").format('h:mma');
    return newItem
  }
}

export type ScheduleDayTime = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
  start: String,
  end: String,
  location: String
}

export type Schedule = {
  id: any,
  courseId: any,
  type: any,
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun",
  start: String,
  end: String,
  location: String
}
