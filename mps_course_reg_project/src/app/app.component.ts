import { Component, OnInit } from '@angular/core';
import { UtilService } from './util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mps_course_reg_project';

  sidebarVisible: boolean = false;
  userDetails:any = {}

  constructor(
    readonly util: UtilService
  ){

  }

  ngOnInit(): void {
      this.userDetails = this.util.getUserInfo();
  }

  onToggle(event: any) {
    this.sidebarVisible = event.checked;
  }
}
