import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../authentication/helpers/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { RegistrationComponent } from './registration/registration.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TreeSelectModule } from 'primeng/treeselect';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DialogModalComponent } from './common/components/dialog-modal/dialog-modal.component';
import { TableModule } from 'primeng/table';
import { CourseDetailComponent } from './course-catalog/course-detail/course-detail.component';
import { CourseFullDetailComponent } from './course-catalog/course-full-detail/course-full-detail.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ScheduleCardComponent } from './registration/schedule-card/schedule-card.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegisteredCardComponent } from './registration/registered-card/registered-card.component';
import { WaitlistedCardComponent } from './registration/waitlisted-card/waitlisted-card.component';
import { RegistrationHelperComponent } from './registration/registration-helper/registration-helper.component';
import { WeeklyScheduleComponent } from './home-page/weekly-schedule/weekly-schedule.component';
import { CourseWidgetsComponent } from './scheduler/course-widgets/course-widgets.component';
import { WishlistWidgetsComponent } from './scheduler/wishlist-widgets/wishlist-widgets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CourseCatalogComponent,
    SchedulerComponent,
    RegistrationComponent,
    StudentInformationComponent,
    LoginComponent,
    RegisterComponent,
    TopNavComponent,
    SideNavComponent,
    DialogModalComponent,
    CourseDetailComponent,
    CourseFullDetailComponent,
    ScheduleCardComponent,
    RegisteredCardComponent,
    WaitlistedCardComponent,
    RegistrationHelperComponent,
    WeeklyScheduleComponent,
    CourseWidgetsComponent,
    WishlistWidgetsComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    TooltipModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    TieredMenuModule,
    TreeSelectModule,
    ListboxModule,
    PasswordModule,
    PanelModule,
    MenubarModule,
    SidebarModule,
    TabMenuModule,
    SelectButtonModule,
    ToggleButtonModule,
    DropdownModule,
    MenuModule,
    ConfirmDialogModule,
    CardModule,
    MessageModule,
    ToastModule,
    MessagesModule,
    MatSidenavModule,
    VirtualScrollerModule,
    DialogModule,
    MultiSelectModule,
    PanelMenuModule,
    AccordionModule,
    AutoCompleteModule,
    CheckboxModule,
    ChipsModule,
    TableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
