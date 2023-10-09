import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  user:any;

  getUserInfo(){
    this.user = {
      name: "Claire",
      course: "MPS Information Science",
      university: "Cornell University",
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
