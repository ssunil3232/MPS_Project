import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnChanges {
  side_nav_items: MenuItem[] | undefined;
  side_nav_items_icons: MenuItem[] | undefined;

  @Input() sidebarVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }

  ngOnInit() {
    this.side_nav_items = [
      {
        label: 'Home Page',
        icon: 'pi pi-home',
        routerLink: "/home-page"
      },
      {
        label: 'Course Catalog',
        icon: 'pi pi-book',
        routerLink: "/course-catalog"
      },
      {
        label: 'Scheduler',
        icon: 'pi pi-calendar',
        routerLink: "/scheduler"
      },
      {
        label: 'Registration',
        icon: 'pi pi-shopping-cart',
        routerLink: "/registration"
      },
      {
        label: 'Student Information',
        icon: 'pi pi-user',
        routerLink: "/student-information"
      }
      
    ]

    this.side_nav_items_icons = [
      {
        icon: 'pi pi-home',
        routerLink: "/home-page"
      },
      {
        icon: 'pi pi-book',
        routerLink: "/course-catalog"
      },
      {
        icon: 'pi pi-calendar',
        routerLink: "/scheduler"
      },
      {
        icon: 'pi pi-shopping-cart',
        routerLink: "/registration"
      },
      {
        icon: 'pi pi-user',
        routerLink: "/student-information"
      }
    ]
  }

  getToolTip(event:any){
    console.log(event)
  }
}
