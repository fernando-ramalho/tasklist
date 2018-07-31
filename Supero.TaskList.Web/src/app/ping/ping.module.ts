import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListModule } from './../task-list/task-list.module';
import { PingComponent } from './ping.component';

@NgModule({
    imports: [
        CommonModule,
        TaskListModule
    ],
    declarations: [
        PingComponent
    ],
    exports: [
        PingComponent 
    ]
})
export class PingModule { }
