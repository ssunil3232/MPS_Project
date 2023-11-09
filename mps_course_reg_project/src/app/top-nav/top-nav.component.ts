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

  onIconClass: string = 'pi pi-angle-right';
  offIconClass: string = 'pi pi-angle-left';


  ngOnInit() {
    this.top_nav_items = [
      {
        icon: 'pi pi-user'
      }
    ]
    this.onIconClass = 'pi pi-angle-right';
    this.offIconClass = 'pi pi-angle-left';
  }

  onToggle(event:any){
    this.toggle.emit(event)
    console.log("event", event)
    if (event.checked) {
      this.onIconClass = 'pi pi-angle-left rotated';
      this.offIconClass = 'pi pi-angle-right rotated-opp';
    } else {
      this.onIconClass = 'pi pi-angle-left rotated';
      this.offIconClass = 'pi pi-angle-right rotated-opp';
    }
  }
   
}
