import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { UtilService } from '../util.service';
import { course_catalog } from "../data";
import { ConfirmationService, MessageService } from 'primeng/api';
import { FullCalendarComponent } from '@fullcalendar/angular';

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
  userWishlistData: any;
  showInputBoxFlag: boolean = false;
  // showEditBoxFlag: boolean = false;
  showDeleteBoxFlag: boolean = false;
  inputText: string = '';
  saving: boolean = false;
  buttonLabel: string = 'Save';
  buttonIcon: string = 'pi pi-check';
  searchValue: any;
  errorMessage: any = '';
  showPlaceholder: boolean = true;
  filteredItems: any[] = [];
  formattedCalendar: any = []
  selectedSchedule: any;
  course_catalog = course_catalog.data;
  coloredCourses: any;
  term: any;
  creditSum: any = 0;

  stateOptions: any[] = [{ label: 'Horizonal View', value: 'horizontal' }, { label: 'Vertical View', value: 'vertical' }];

  value: string = 'horizontal';

  empty_schedule = {
    name: "Schedule 0",
    id: "0",
    data: []
  };

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
      this.scheduleData = [...this.selectedSchedule.data];
    }
    else {
      this.schedules = []
      this.schedules.push(this.empty_schedule)
      Object.assign(this.selectedSchedule, this.schedules[0]);
      this.scheduleData = [...this.selectedSchedule.data];
    }
    this.changeDetectorRef.detectChanges();
    this.calendarConfig(this.scheduleData);
  }

  scheduleChange() {
    this.scheduleData = this.selectedSchedule["data"]
    this.calendarConfig(this.scheduleData);
  }

  removeCourse(event: any) {
    console.log("removed", event);
    this.selectedSchedule["data"] = this.selectedSchedule["data"].filter((item: any) => {
      if (!(item.courseCode === event.courseCode && item.subjectCode === event.subjectCode)) {
        return item
      }
    });
    //update selected schedule in the backend
    this.scheduleChange();
  }

  updateCourses(event: any) {
    //check if course exists
    let existing: any = [];
    existing = this.selectedSchedule["data"].filter((item: any) => {
      if (item.courseCode === event.courseCode && item.subjectCode === event.subjectCode) {
        return item
      }
    });
    if (existing.length > 0) {

    }
    else {
      this.selectedSchedule["data"].push(event)
      this.scheduleChange()
    }
  }

  resources: any = []
  formatDataStructure(classData: any) {
    this.formattedCalendar = [];
    this.resources = []
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
      this.scheduleData = classData;
      this.selectedSchedule.data = this.scheduleData;
      //get resource Ids

      for (let i = 0; i < classData.length; i++) {
        let cal: any = classData[i];
        let resourceId = cal.subjectCode + cal.courseCode
        this.resources.push({ id: resourceId });
        //for lecture items
        let lectDetail = cal.lectureDetail.dayTimes;
        let lecObj: any = { ...cal };
        lecObj["id"] = cal.lectureDetail.prefix + " " + cal.lectureDetail.lectureId;
        lecObj["editable"] = false;
        let daysArray: any = []
        for (let j = 0; j < lectDetail.length; j++) {
          let item: any = lectDetail[j];
          lecObj["startTime"] = item.startTime;
          lecObj["endTime"] = item.endTime;
          daysArray.push(this.days[item.day])
        }
        lecObj["daysOfWeek"] = daysArray;
        this.formattedCalendar.push(lecObj);

        //for discussion items
        let tutObj: any = { ...cal }
        for (let k = 0; k < cal.discussionItems.length; k++) {
          let discusionItem = cal.discussionItems[k];
          let tutDetail = discusionItem.dayTimes;
          tutObj["editable"] = true;

          let constraintsArray: any = [];
          if (discusionItem.selected) {
            let daysArray: any = []
            tutObj["id"] = discusionItem.prefix + " " + discusionItem.discussionId;
            tutObj["resourceId"] = resourceId;
            for (let j = 0; j < tutDetail.length; j++) {
              let item: any = tutDetail[j];
              daysArray.push(this.days[item.day])
              tutObj["startTime"] = item.startTime;
              tutObj["endTime"] = item.endTime;
            }
            tutObj["daysOfWeek"] = daysArray;
          }
          else {
            let daysArray: any = []
            let constraint: any = {}
            for (let j = 0; j < tutDetail.length; j++) {
              let item: any = tutDetail[j];
              daysArray.push(this.days[item.day])
              constraint["resourceId"] = resourceId;
              constraint["id"] = discusionItem.prefix + " " + discusionItem.discussionId;
              constraint["startTime"] = item.startTime;
              constraint["endTime"] = item.endTime;
            }
            constraint["daysOfWeek"] = daysArray;
            constraintsArray.push(constraint);
          }
          tutObj["constraint"] = constraintsArray;
        }
        this.formattedCalendar.push(tutObj)
      }
    }
  }

  calendarConfig(scheduleData: any) {
    this.formatDataStructure(scheduleData);
    if (this.fullcalendar) {
      this.fullcalendar?.getApi().destroy();
    }
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 1);
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.formattedCalendar,
    };
    this.calculateCredits()
    this.fullcalendar?.getApi().render();
    this.changeDetectorRef.detectChanges();

    //send to backend to update user schedules
  }

  populateSchedules() {
    //post request to fetch user schedules
    let user: any = this.util.getUserInfo();
    this.term = user.currentTerm;
    this.schedules = user.schedules;
  }

  calculateCredits() {
    let sumCredits: any = 0;
    for (let i = 0; i < this.selectedSchedule.data.length; i++) {
      let course: any = this.selectedSchedule.data[i];
      sumCredits += course.credits;
    }
    this.creditSum = sumCredits;
  }

  ngOnInit() {
    this.populateSchedules();
    this.selectedSchedule = this.schedules[0]
    this.scheduleData = this.selectedSchedule.data;
    this.calendarConfig(this.scheduleData);
  }

}
