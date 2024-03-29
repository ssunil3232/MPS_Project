import { Component, OnInit } from '@angular/core';
import { Schedule, UtilService } from '../util.service';
import { PendingTasksService } from './services/pending-tasks.service';
import { Router } from '@angular/router';
import { DialogMessage } from '../common/components/dialog-modal/dialog-modal.component';
import { AnnouncementsService } from './services/announcements.service';
import { QuickLinksService } from './services/quick-links.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  tasks:any [] = [];
  announcements:any [] = [];
  quickLinks:any [] = [];
  dialogOpen: boolean = false;
  dialogBody: DialogMessage = {title: '', message: ''};
  schedule: any; 
  selectedItem!: Schedule;
  registeredClasses: any = [];
  week:any;
  userDetails: any = {}

  constructor(
    public router: Router,
    public util: UtilService,
    private pendingTaskService: PendingTasksService,
    private announcementService: AnnouncementsService,
    private quickLinksService: QuickLinksService
  ) {

  }

  ngOnInit(): void {
    this.userDetails = this.util.getUserInfo();
    this.registeredClasses = this.userDetails.registeredClasses;
    this.schedule = this.userDetails.schedule;
    this.tasks = this.pendingTaskService.getPendingTasks();
    this.announcements = this.announcementService.getAnnoucements();
    this.quickLinks = this.quickLinksService.getQuickLinks();
    this.getCurrentWeek();
  }

  dialogClick(item:any){
    this.dialogOpen = true;
    this.dialogBody.title = item.name;
    this.dialogBody.message = item.description;
  }

  redirectToUrl(item:any){
    (window as any).open(`${item.description}`, "_blank");
  }

  getCurrentWeek(){
    let mon = moment().day("Mon").format("MMMM Do");
    let fri = moment().day("Fri").format("MMMM Do");
    let year = moment().format("YYYY");
    this.week = mon+" - "+fri+", "+year;
  }

}
