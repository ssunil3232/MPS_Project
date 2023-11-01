import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { UtilService } from '../util.service';
import { course_catalog } from "../data";
import { ConfirmationService, MessageService } from 'primeng/api';
import * as cloneDeep from 'lodash';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @ViewChild('autoCompleteInput') autoCompleteInput!: ElementRef;

  schedules: any = [];
  calendarOptions: CalendarOptions = {}
  days: any = {
    "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5
  }
  letters = '0123456789ABCDEF';
  color = '#';
  scheduleData: any;
  showInputBoxFlag: boolean = false;
  showEditBoxFlag: boolean = false;
  showDeleteBoxFlag: boolean = false;
  inputText: string = '';
  saving: boolean = false; // Indicates if data is being saved
  buttonLabel: string = 'Save'; // Initial button label
  buttonIcon: string = 'pi pi-check'; // Initial button icon
  searchValue: any;
  errorMessage: any = '';
  showPlaceholder: boolean = true;

  course_catalog = course_catalog.data;

  focusInput() {
    this.autoCompleteInput.nativeElement.focus();
  }

  filteredItems: any[] = [];

  filterCourses(event: any) {
    this.filteredItems = this.course_catalog.filter((item: any) =>
      item.name.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  loseFocus() {
    this.showPlaceholder = true;
    this.searchValue = null;
  }


  isOnlyWhitespace(str: any) {
    return /^\s*$/.test(str);
  }

  startsWithWhiteSpace(str: any) {
    this.errorMessage = "Trailing white space detected."
    return /^\s/.test(str);
  }

  endsWithWhiteSpace(str: any) {
    this.errorMessage = "Trailing white space detected."
    return /\s$/.test(str);
  }

  validScheduleName(name: any) {
    let exists = false;
    this.schedules.filter((item: any) => {
      if (item.name === name) {
        exists = true;
      }
    });
    this.errorMessage = "Schedule Name exists.";
    return exists;
  }

  saveInput() {
    this.saving = true;
    this.buttonLabel = 'Saving';
    this.buttonIcon = 'pi pi-spin pi-spinner';

    setTimeout(() => {
      this.saving = false;
      this.buttonLabel = 'Save';
      this.buttonIcon = 'pi pi-check';
      //check if valid
      //if invalid save, show message that existing name

      if (!(this.startsWithWhiteSpace(this.inputText) || this.endsWithWhiteSpace(this.inputText)
        || this.validScheduleName(this.inputText) || this.isOnlyWhitespace(this.inputText))
      ) {
        
        //repopulate schedules after saving schedule body to user schedules
        //temporary fix
        console.log('initial this.schedules:', this.schedules);
        let saveObject = {
          name: this.inputText,
          id: this.inputText,
          data: []
        };

        this.schedules.push(saveObject);
        this.selectedSchedule = this.schedules[this.schedules.length-1];
        this.scheduleChange()
        //this.scheduleData = this.selectedSchedule.data;
        // this.calendarConfig();
        // this.changeDetectorRef.detectChanges();
      }
      this.showInputBoxFlag = false;
      this.inputText = ""

    }, 2000);

  }

  getRandomColor() {
    this.color = "#";
    for (var i = 0; i < 6; i++) {
      this.color += this.letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  constructor(
    public util: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this schedule?',
      header: 'Delete schedule',
      icon: 'pi pi-info-circle',
      accept: () => {
        //if remove here--> send to backedn and then on success print the dialog
        //send to previous screen to rerun fetch of user registered classes
        //this.courseRemoval.emit();
        this.removeSchedule()
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Deleted schedule.' });
      },
      reject: () => {
      }
    });
  }

  removeSchedule() {
    this.schedules = this.schedules.filter((item: any) => {
      if (item.id !== this.selectedSchedule.id)
        return item;
    });
    if (this.schedules.length !== 0) {
      Object.assign(this.selectedSchedule, this.schedules[0]);
      this.scheduleData = this.selectedSchedule.data;
    }
    else {
      this.selectedSchedule = null;
      this.scheduleData = [];
    }
    this.calendarConfig();
    this.changeDetectorRef.detectChanges();
  }

  formattedCalendar: any = []

  formatData(classData: any) {
    this.formattedCalendar = [];
    if (classData.length > 0) {
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
        let constraintsArray: any = []
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
            let constraint: any = {}
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
  }
  selectedSchedule: any;

  scheduleChange() {
    this.scheduleData = this.selectedSchedule["data"]
    console.log("this.scheduleData", this.scheduleData)
    this.calendarConfig();
    this.changeDetectorRef.detectChanges();
  }

  calendarConfig() {
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


  ngOnInit() {
    //post request to fetch user schedules
    let user: any = this.util.getUserInfo();
    this.schedules = user.schedules;
    this.selectedSchedule = this.schedules[0]
    this.scheduleData = this.selectedSchedule.data;
    this.calendarConfig();
  }

}
