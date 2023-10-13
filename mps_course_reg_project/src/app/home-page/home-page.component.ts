import { Component, OnInit } from '@angular/core';
import { Schedule, UtilService } from '../util.service';
import { PendingTasksService } from './services/pending-tasks.service';
import { Router } from '@angular/router';
import { DialogMessage } from '../common/components/dialog-modal/dialog-modal.component';
import { AnnouncementsService } from './services/announcements.service';
import { QuickLinksService } from './services/quick-links.service';

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

  userDetails: any = {}

  constructor(
    public router: Router,
    readonly util: UtilService,
    private pendingTaskService: PendingTasksService,
    private announcementService: AnnouncementsService,
    private quickLinksService: QuickLinksService
  ) {

  }

  ngOnInit(): void {
    this.userDetails = this.util.getUserInfo();
    this.schedule = this.userDetails.schedule;
    this.tasks = this.pendingTaskService.getPendingTasks();
    this.announcements = this.announcementService.getAnnoucements();
    this.quickLinks = this.quickLinksService.getQuickLinks();
  }

  dialogClick(item:any){
    this.dialogOpen = true;
    this.dialogBody.title = item.name;
    this.dialogBody.message = item.description;
  }

  redirectToUrl(item:any){
    (window as any).open(`${item.description}`, "_blank");
  }

}
