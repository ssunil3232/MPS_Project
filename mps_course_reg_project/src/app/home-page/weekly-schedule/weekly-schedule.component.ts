import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import * as moment from 'moment';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

@Component({
  selector: 'weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnChanges, OnInit {

  @Input() classes: any;
  calendarOptions: CalendarOptions = {}
  days: any = {
    "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5
  }

  ngOnInit() {
    setTimeout( function() {
        window.dispatchEvent(new Event('resize'))
    }, 1)
  }

  formattedCalendar: any = []

  formatData(classData: any) {
    this.formattedCalendar = [];
    classData = classData.map((item: any) => ({
      ...item,
      color: this.getRandomColor()
    }));
    for (let i = 0; i < classData.length; i++) {
      let cal: any = classData[i];
      let lectDetail = cal.lectureDetail.dayTimes;
      for (let j = 0; j < lectDetail.length; j++) {
        let item: any = lectDetail[j];
        if (item.selected) {
          let lecObj: any = { ...cal };
          lecObj["id"] = cal.lectureDetail.lectureId;
          lecObj["prefix"] = cal.lectureDetail.prefix;
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
      for (let j = 0; j < tutDetail.length; j++) {
        let item: any = tutDetail[j];
        if (item.selected) {
          let tutObj: any = { ...cal }
          tutObj["id"] = cal.discussionDetail.discussionId;
          tutObj["prefix"] = cal.discussionDetail.prefix;
          let [starthours, startminutes] = item.startTime.split(':').map(Number);
          let dayStart = moment().day(this.days[item.day]).hour(starthours).minute(startminutes).second(0).millisecond(0);
          let [endhours, endminutes] = item.endTime.split(':').map(Number);
          let dayEnd = moment().day(this.days[item.day]).hour(endhours).minute(endminutes).second(0).millisecond(0);
          tutObj["start"] = dayStart.format('YYYY-MM-DDTHH:mm:SS');
          tutObj["end"] = dayEnd.format('YYYY-MM-DDTHH:mm:SS');
          this.formattedCalendar.push(tutObj);
        }
      }
    }

  }

  letters = '0123456789ABCDEF';
  color = '#';

  getRandomColor() {
    this.color = "#";
    for (var i = 0; i < 6; i++) {
      this.color += this.letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.formatData(this.classes)


    this.calendarOptions = {
      initialView: 'timeGridWeek',
      allDaySlot: false,
      slotMinTime: "07:00:00",
      slotMaxTime: "20:00:00",
      eventMinHeight: 75,
      expandRows: true,
      nowIndicator: true,
      editable: false,
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
      scrollTime: moment().subtract(3, 'hours').format('HH:mm:SS'),
      dayHeaderContent: (args) => {
        return moment(args.date).format('ddd')
      },
      weekends: false,
      events: this.formattedCalendar,
      eventDidMount: (info:any) => {
        // let eventElement = info.el as HTMLElement;      
        // eventElement.style.height = 'fit-content';
        // let element:any = document.querySelector('.fc-event-main');
        // const computedStyles = window.getComputedStyle(element);
        // const eventHeight = computedStyles.getPropertyValue('height');
        // const rowHeight = eventHeight + 20;
  
        // // Perform the necessary logic to dynamically update the row height
        // const calendarWrapper:any = document.querySelector('.fc');
        // if (calendarWrapper) {
        //   calendarWrapper.style.setProperty('--fc-row-height', rowHeight + 'px');
        // }
      }
    };
  }
}
