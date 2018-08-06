import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from './../directives/directives.module';
import { CustomMaterialModule } from './../custom-material-module/custom-material-module.module';


import { TaskListComponent } from "./task-list.component";
import { TaskListService } from "./task-list.service";
import { TaskListFormComponent } from './task-list-form/task-list-form.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        CustomMaterialModule
    ],
    declarations: [TaskListComponent, TaskListFormComponent],
    exports: [TaskListComponent],
    providers: [TaskListService]

})
export class TaskListModule { }
