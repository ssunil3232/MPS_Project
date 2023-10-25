import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { UtilService } from '../util.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  constructor( public util: UtilService){

  }

  courseDetails: any;

  dummy_course = {
    name: "CS1010",
    dayTimes: [
      {
        start: "10:00",
        end: "11.10",
        day: "Tue",
        location: "Statler Hall",
        selected: true
      },
      {
        start: "10:00",
        end: "11.10",
        day: "Wed",
        location: "Statler Hall",
        selected: false
      },
      {
        start: "10:00",
        end: "11.10",
        day: "Fri",
        location: "Statler Hall",
        selected: false
      }
    ]
  };

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    allDaySlot: false,
    slotMinTime: "07:00:00",
    slotMaxTime: "20:00:00",
    nowIndicator: false,
    //selectable: true,
    //selectMirror: true,
    editable: true,
    businessHours: true,
    //eventMinHeight: 70,
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
    eventDidMount: function(event:any) {
      //console.log("eveee", event)
      //let xxx = 
      if (event.getCurrentData) {
        // Apply a lighter hue to constrained events
       // event.css('background-color', 'red');
      }
    },
    eventDragStart: function (event:any) {
      // Identify and highlight constraint sections
      // You may add a CSS class to these sections
      let info = event.getEventSources
      console.log("eveee", event)
      //$('.fc-event-draggable').addClass('highlighted');
     

    },
    events: [
      {
        subjectCode: "INFO",
        courseCode: "1050",
        title: "Information, Ethics, Law, and Policy",
        start: moment('10:10', 'h:mm a').day("Wed").format(),
        end: moment('12:10', 'h:mm a').day("Wed").format(),
        
        lectureDetail: {
          prefix: "LEC",
          lectureId: "003",
        },
        constraint: [
          {
            startTime: '10:10',
            endTime: '12:10',
            daysOfWeek: [1, 3, 4]
          },
          {
            startTime: '14:00',
            endTime: '16:00',
            daysOfWeek: [2]
          }
        ],
      },
      {
        start: moment('15:00', 'h:mm a').day("Mon").format(),
        end: moment('16:00', 'h:mm a').day("Mon").format(),
        id: "1020",
        subjectCode: "INFO",
        courseCode: "1050",
        lectureId: 1,
        title: "Information, Ethics, Law, and Policy",
        lectureDetail: {
          prefix: "LEC",
          lectureId: "003",
        },
        selected: true
      },
    ],
    eventMouseEnter: function (mouseEnterInfo) {
      mouseEnterInfo.el.classList.remove('light-on-hover');
      mouseEnterInfo.el.classList.add('dark-on-hover');
    },
    eventMouseLeave: function (mouseLeaveInfo) {
      mouseLeaveInfo.el.classList.remove('dark-on-hover');
      mouseLeaveInfo.el.classList.add('light-on-hover');
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
    eventContent: function (info:any) {
      // Check if the event is a constraint section
      console.log("hello", info)
      if (info.event.extendedProps.isConstraint) {
        console.log("hello", info.event.extendedProps)
        //info.el.style.backgroundColor = this.constraintBackgroundColor;
      }
    }
  };
  ngOnInit(): void {
    let data: any = this.util.getDataLocal('added')
    console.log("data", data)
  }



}
