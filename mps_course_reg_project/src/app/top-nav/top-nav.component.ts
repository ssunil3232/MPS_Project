import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  top_nav_items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;
  @Input() universityName: any = "";
  @Output() toggle = new EventEmitter<any>();


  ngOnInit() {
    this.top_nav_items = [
      {
        icon: 'pi pi-user'
      }
    ]
  }

  onToggle(event:any){
    this.toggle.emit(event)
  }
   
}
