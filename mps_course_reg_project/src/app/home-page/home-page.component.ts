import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userDetails: any = {}

  constructor(
    readonly util: UtilService
  ) {

  }

  ngOnInit(): void {
    this.userDetails = this.util.getUserInfo();
  }

}
