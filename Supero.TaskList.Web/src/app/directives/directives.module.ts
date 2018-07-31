import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageDirective } from "./validation-message.directive";
import { FocusDirective } from './focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ValidationMessageDirective, FocusDirective],
  exports: [ValidationMessageDirective,FocusDirective],
  
})
export class DirectivesModule { }
