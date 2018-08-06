import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from "./../directives/directives.module";
import { CustomMaterialModule } from './../custom-material-module/custom-material-module.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Http } from '@angular/http';

import { TaskListModule } from './../task-list/task-list.module';
import { PingComponent } from './ping.component';
import { PingService } from './ping.service';

@NgModule({
    imports: [
        CommonModule,
        TaskListModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    declarations: [
        PingComponent
    ],
    exports: [
        PingComponent,
        TaskListModule 
    ],
    providers: [
        PingService
    ]
})
export class PingModule { }
