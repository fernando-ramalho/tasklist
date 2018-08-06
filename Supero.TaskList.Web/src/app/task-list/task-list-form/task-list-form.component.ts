import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { CustomMaterialModule } from './../../custom-material-module/custom-material-module.module';
import { TaskListModel } from './../../models/TaskListModel';

@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.css']
})
export class TaskListFormComponent implements OnInit {
    public task: TaskListModel = null;

    constructor() { }

    ngOnInit() {
        this.task = new TaskListModel();
    }

    @Output()
    taskAdded = new EventEmitter();

    addTask() {
        this.taskAdded.emit(this.task);
        this.task = new TaskListModel();
    }
}