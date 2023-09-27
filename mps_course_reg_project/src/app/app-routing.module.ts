import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { RegistrationComponent } from './registration/registration.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { StudentInformationComponent } from './student-information/student-information.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'course-catalog', component: CourseCatalogComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'scheduler', component: SchedulerComponent },
  { path: 'student-information', component: StudentInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
