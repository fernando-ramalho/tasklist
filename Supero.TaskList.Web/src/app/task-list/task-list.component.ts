import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { TaskListService } from "./task-list.service";
import { TaskListModel } from "../models/TaskListModel";
import { Subscription } from "rxjs/Subscription";
import { Validators, FormGroup } from "@angular/forms";
import { BaseComponent } from "./../core/base-component";
import { LoaderService } from "./../core/loader.service";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { environment } from './../../environments/environment';
import { AuthService } from './../services/auth.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent extends BaseComponent implements OnInit, OnDestroy {

    public id: number;
    public subscriptions: Subscription = new Subscription();
    public tasks: TaskListModel[] = new Array<TaskListModel>();
    public Item: TaskListModel = new TaskListModel();
    editTask: TaskListModel = undefined;
    profile: any;

    @Input()
    public childForm: FormGroup;

    @Input()
    public value: number;

    @Output()
    public valueChange = new EventEmitter<number>();

    constructor(private tasklistService: TaskListService,
        public loaderService: LoaderService,
        public modalService: BsModalService,
        private auth: AuthService
    ) {
        super(modalService, loaderService)
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
            });
        }

        this.loadTaskList();
    }

    loadTaskList() {
        this.tasklistService.GetTask(this.profile.nickname).subscribe(data => {
            this.tasks = data;
        });
    }

    taskAddedHandler(task) {
        task.IdUsuario = this.profile.nickname;
        this.tasklistService.Save(task).subscribe(
            response => {
                this.Item = response;
                this.loadTaskList();
            },
            error => this.ShowError(error)
        );
    }

    deleteTask(task) {
        this.tasklistService.DeleteTask(task).subscribe(
            response => this.loadTaskList(),
            error => this.ShowError(error)
        );
    }

    edit(task) {
        this.editTask = task;
    }


    update() {
        if (this.editTask) {
            this.tasklistService.Update(this.editTask)
                .subscribe(task => {
                    // replace the task in the tasks list with update from server
                    const ix = task ? this.tasks.findIndex(t => t.Id === task.id) : -1;
                    if (ix > -1) { this.tasks[ix] = task; }
                });
            this.editTask = undefined;
        }
    }

    sTbState: string = 'invisible';

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    change(newValue) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

    isNull(value) {
        return (value == null || value == undefined || value === environment.DATE_TIME_MINVALUE);
    }

}
