import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { TaskListService } from "./task-list.service";
import { TaskList } from "../models/TaskList";
import { Subscription } from "rxjs/Subscription";
import { FormGroup } from "@angular/forms";
import { LoaderService } from "./../core/loader.service";
import { ErrorMessage } from "./../models/Error-Message";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BaseComponent } from "./../core/base-component";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

    public id: number;
    public subscriptions: Subscription = new Subscription();
    public Items: TaskList[] = new Array<TaskList>();

    @Input()
    public childForm: FormGroup;

    @Input()
    public value: number;
    
    @Output()
    public valueChange = new EventEmitter<number>();

    constructor(private tasklistService: TaskListService) {
    }

    ngOnInit() {
        this.loadTaskList();
    }

    loadTaskList() {
        //let params = Array<string>();
        //params.push("id=" + this.id);

        //this.subscriptions.add(this.tasklistService.GetByFilter(params.toString()).subscribe(data2 => {
        //    this.Items = data2;
        //}));

        this.tasklistService.GetAll().subscribe(data => {
            this.Items = data;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    change(newValue) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

}
