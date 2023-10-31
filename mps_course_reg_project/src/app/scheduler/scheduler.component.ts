import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { UtilService } from '../util.service';
import * as $ from 'jquery';
//import { user_schedules } from "../data"

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  calendarOptions: CalendarOptions = {}
  days: any = {
    "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5
  }
  letters = '0123456789ABCDEF';
  color = '#';
  scheduleData:any;

  getRandomColor() {
    this.color = "#";
    for (var i = 0; i < 6; i++) {
      this.color += this.letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  constructor(public util: UtilService) {

  }

  formattedCalendar: any = []

  formatData(classData: any) {
    this.formattedCalendar = [];
    classData = classData.map((item: any) => {
      if (item.color !== null) {
        return item
      }
      else {
        return {
          ...item,
          color: this.getRandomColor()
        }
      }
    });
    for (let i = 0; i < classData.length; i++) {
      let cal: any = classData[i];
      let lectDetail = cal.lectureDetail.dayTimes;
      for (let j = 0; j < lectDetail.length; j++) {
        let item: any = lectDetail[j];
        if (item.selected) {
          let lecObj: any = { ...cal };
          lecObj["id"] = cal.lectureDetail.lectureId;
          lecObj["prefix"] = cal.lectureDetail.prefix;
          lecObj["editable"] = false;
          let [starthours, startminutes] = item.startTime.split(':').map(Number);
          let dayStart = moment().day(this.days[item.day]).hour(starthours).minute(startminutes).second(0).millisecond(0);
          let [endhours, endminutes] = item.endTime.split(':').map(Number);
          let dayEnd = moment().day(this.days[item.day]).hour(endhours).minute(endminutes).second(0).millisecond(0);
          lecObj["start"] = dayStart.format('YYYY-MM-DDTHH:mm:SS');
          lecObj["end"] = dayEnd.format('YYYY-MM-DDTHH:mm:SS');
          this.formattedCalendar.push(lecObj);
        }
      }

      let tutDetail = cal.discussionDetail.dayTimes;
      let tutObj: any = { ...cal }
      tutObj["id"] = cal.discussionDetail.discussionId;
      tutObj["prefix"] = cal.discussionDetail.prefix;
      tutObj["editable"] = true;
      let constraintsArray:any = []
      for (let j = 0; j < tutDetail.length; j++) {
        let item: any = tutDetail[j];
        if (item.selected) {
          let [starthours, startminutes] = item.startTime.split(':').map(Number);
          let dayStart = moment().day(this.days[item.day]).hour(starthours).minute(startminutes).second(0).millisecond(0);
          let [endhours, endminutes] = item.endTime.split(':').map(Number);
          let dayEnd = moment().day(this.days[item.day]).hour(endhours).minute(endminutes).second(0).millisecond(0);
          tutObj["start"] = dayStart.format('YYYY-MM-DDTHH:mm:SS');
          tutObj["end"] = dayEnd.format('YYYY-MM-DDTHH:mm:SS');
        }
        else {
          let constraint:any = {}
          constraint["startTime"] = item.startTime;
          constraint["endTime"] = item.endTime;
          constraint["daysOfWeek"] = [this.days[item.day]];
          constraintsArray.push(constraint);
        }
      }
      tutObj["constraint"] = constraintsArray;
      this.formattedCalendar.push(tutObj);
    }

  }


  ngOnInit() {
    //post request to fetch user schedules
    let user:any = this.util.getUserInfo();
    this.scheduleData = user.schedules[0].data; 
    this.formatData(this.scheduleData)
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 1);

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      allDaySlot: false,
      slotMinTime: "07:00:00",
      slotMaxTime: "20:00:00",
      nowIndicator: false,
      eventMinHeight: 75,
      expandRows: true,
      businessHours: false,
      slotLabelFormat: {
        minute: 'numeric',
        hour: 'numeric',
        hour12: false,
  
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: '',
        center: '',
        right: ''
      },
      dayHeaderContent: (args) => {
        return moment(args.date).format('ddd')
      },
      weekends: false,
      events: this.formattedCalendar,
      eventMouseEnter: function (mouseEnterInfo) {
        mouseEnterInfo.el.classList.remove('light-on-hover');
        mouseEnterInfo.el.classList.add('dark-on-hover');
      },
      eventMouseLeave: function (mouseLeaveInfo) {
        mouseLeaveInfo.el.classList.remove('dark-on-hover');
        mouseLeaveInfo.el.classList.add('light-on-hover');
      },
      eventDidMount: function (event: any) {
        //console.log("eveee", event)
        //let xxx = 
        if (event.getCurrentData) {
          // Apply a lighter hue to constrained events
          // event.css('background-color', 'red');
        }
      },
      eventDragStart: function (event: any) {
        // Identify and highlight constraint sections
        // You may add a CSS class to these sections
        let info = event.getEventSources
        //console.log("eveee", event)
        //$('.fc-event-draggable').addClass('highlighted');
  
  
      },
      eventClick: function (info) {
        // let cal = info.view.calendar.getEvents();
        // let currentId = info.event.id;
        // for (let i = 0; i < cal.length; i++) {
        //   if (cal[i].id === currentId) {
        //     console.log("calaaa", cal[i].id)
        //     //cal[i].borderColor = "red";
        //   }
        // }
        //console.log("info", cal)
  
        //info.el.classList.add('dark-on-hover');
        //let allcourses = calendarOptions.getEventById('a')
      },
    };

  }

}
