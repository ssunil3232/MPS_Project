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
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
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
    CourseFullDetailComponent
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    MenubarModule,
    SidebarModule,
    ToggleButtonModule,
    DropdownModule,
    MenuModule,
    MatSidenavModule,
    VirtualScrollerModule,
    DialogModule,
    TableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
