import { DirectivesModule } from './../directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskListComponent } from "./task-list.component";
import { TaskListService } from "./task-list.service";
import { Http, ConnectionBackend } from '@angular/http';
import { HttpService } from "./../services/http.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    declarations: [
        TaskListComponent
    ],
    exports: [
        TaskListComponent
    ],
    providers: [
        TaskListService, HttpService
    ]

})
export class TaskListModule { }
