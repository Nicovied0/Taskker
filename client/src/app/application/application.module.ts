import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AppviewComponent } from './views/appview/appview.component';
import { NavComponent } from './components/nav/nav.component';
import { ProfileviewComponent } from './views/profileview/profileview.component';
import { EditprofileviewComponent } from './views/editprofileview/editprofileview.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppviewComponent,
    NavComponent,
    ProfileviewComponent,
    EditprofileviewComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    FormsModule
  ],
})
export class ApplicationModule {}
