import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Calendar, CalendarOptions, EventApi } from '@fullcalendar/core';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { UtilService } from '../util.service';
import { course_catalog } from "../data";
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FullCalendar from '@fullcalendar/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @ViewChild('autoCompleteInput') autoCompleteInput!: ElementRef;
  @ViewChild('fullcalendar', { static: false }) fullcalendar?: FullCalendarComponent;

  schedules: any = [];
  calendarOptions: CalendarOptions = {}
  days: any = {
    "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5
  }
  letters = '0123456789ABCDEF';
  color = '#';
  scheduleData: any;
  showInputBoxFlag: boolean = false;
  // showEditBoxFlag: boolean = false;
  showDeleteBoxFlag: boolean = false;
  inputText: string = '';
  saving: boolean = false; // Indicates if data is being saved
  buttonLabel: string = 'Save'; // Initial button label
  buttonIcon: string = 'pi pi-check'; // Initial button icon
  searchValue: any;
  errorMessage: any = '';
  showPlaceholder: boolean = true;
  filteredItems: any[] = [];
  formattedCalendar: any = []
  selectedSchedule: any;
  course_catalog = course_catalog.data;
  coloredCourses:any;
  term:any;
  creditSum:any = 0;

  stateOptions: any[] = [{label: 'Horizonal View', value: 'horizontal'}, {label: 'Vertical View', value: 'vertical'}];

  value: string = 'horizontal';

  constructor(
    public util: UtilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public changeDetectorRef: ChangeDetectorRef
  ) {
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
      eventMouseEnter: function (mouseEnterInfo) {
        mouseEnterInfo.el.classList.remove('light-on-hover');
        mouseEnterInfo.el.classList.add('dark-on-hover');
      },
      eventMouseLeave: function (mouseLeaveInfo) {
        mouseLeaveInfo.el.classList.remove('dark-on-hover');
        mouseLeaveInfo.el.classList.add('light-on-hover');
      },
      dayHeaderContent: (args) => {
        return moment(args.date).format('ddd')
      },
      weekends: false,
      events: []
    }
  }

  focusInput() {
    this.autoCompleteInput.nativeElement.focus();
  }

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
      //if invalid, show error message --> in html
      //else if valid
      if (!(this.startsWithWhiteSpace(this.inputText) || this.endsWithWhiteSpace(this.inputText)
        || this.validScheduleName(this.inputText) || this.isOnlyWhitespace(this.inputText))
      ) {
        let saveObject = {
          name: this.inputText,
          id: this.inputText,
          data: []
        };
        this.schedules.push(saveObject);
        //save schedules to backend and repopulate schedules
        //this.populateSchedules()
        //temporary fix
        this.selectedSchedule = this.schedules[this.schedules.length - 1];
        this.scheduleChange()
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

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this schedule?',
      header: 'Delete schedule',
      icon: 'pi pi-info-circle',
      accept: () => {
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
    //send to backend to update schedule & repopulate
    //this.populateSchedules()
    if (this.schedules.length !== 0) {
      Object.assign(this.selectedSchedule, this.schedules[0]);
      this.scheduleData = this.selectedSchedule.data;
    }
    else {
      this.selectedSchedule = null;
      this.scheduleData = [];
    }
    this.calendarConfig(this.scheduleData);
  }

  scheduleChange() {
    this.scheduleData = this.selectedSchedule["data"]
    this.calendarConfig(this.scheduleData);
  }

  updateCourses(event: any) {
    //check if course exists
    let existing: any = [];
    existing = this.selectedSchedule["data"].filter((item: any) => {
      if (item.courseCode === event.courseCode && item.subjectCode === event.subjectCode) {
        return item
      }
    });
    console.log("ebee", existing)
    if (existing.length > 0) {

    }
    else {
      this.selectedSchedule["data"].push(event)
      this.scheduleChange()
    }
  }

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
      //save to backend
      this.coloredCourses = classData;
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
    console.log("formattedCalendar", this.formattedCalendar)
  }

  calendarConfig(scheduleData: any) {
      this.formatData(scheduleData);
      if (this.fullcalendar) {
        this.fullcalendar?.getApi().destroy();
      }
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 1);

      let newOption: any = {
        ...this.calendarOptions,
        events: this.formattedCalendar,
      }
      console.log("newOption", newOption)

      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.formattedCalendar,
        eventDidMount: function (event: any) {
          if (event.getCurrentData) {
            // Apply a lighter hue to constrained events
            // event.css('background-color', 'red');
          }
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
      this.calculateCredits()
      this.fullcalendar?.getApi().render();
      this.changeDetectorRef.detectChanges();
  }

  populateSchedules() {
    //post request to fetch user schedules
    let user: any = this.util.getUserInfo();
    this.term = user.currentTerm;
    this.schedules = user.schedules;
  }

  calculateCredits(){
    let sumCredits:any = 0;
    console.log("sched",this.selectedSchedule)
    for(let i=0; i<this.selectedSchedule.data.length; i++){
      let course:any = this.selectedSchedule.data[i];
      sumCredits += course.credits;
    }
    this.creditSum = sumCredits;
    console.log("creditSum",this.creditSum)
  }

  ngOnInit() {
    this.populateSchedules();
    this.selectedSchedule = this.schedules[0]
    this.scheduleData = this.selectedSchedule.data;
    this.calendarConfig(this.scheduleData);
  }

}
