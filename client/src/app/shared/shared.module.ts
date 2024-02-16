import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports:[
    NavComponent, 
    FooterComponent, 
    LoaderComponent
  ]
})
export class SharedModule { }
