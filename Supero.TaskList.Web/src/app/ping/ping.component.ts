import { Component, OnInit, Output, OnDestroy, EventEmitter, Input, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "./../../environments/environment";
import { AuthService } from "./../services/auth.service";

import { BaseFormGroup } from "./../core/base-form-group";
import { BaseFormControl } from "./../core/base-form-control";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { BaseComponent } from './../core/base-component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoaderService } from './../core/loader.service';
import { Subscription } from "rxjs/Subscription";
import { TaskListModel } from "./../models/TaskListModel";

interface IApiResponse {
    message: string;
}

@Component({
    selector: 'app-ping',
    templateUrl: './ping.component.html',
    styleUrls: ['./ping.component.css']
})
export class PingComponent extends  BaseComponent implements OnInit, OnDestroy {

    private API_URL = environment.API_URL;
    private message: string;
    private subscriptions: Subscription = new Subscription();
    public tasklist = new TaskListModel();
    constructor(public auth: AuthService, private http: HttpClient,
        private fb: FormBuilder,
        public loaderService: LoaderService,
        public modalService: BsModalService) {
        super(modalService, loaderService);
        this.loaderService.display(false);
    }

    public form: FormGroup;  

    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    buildForm() {
        this.form = this.fb.group({
            Descricao: [this.tasklist.Descricao, [Validators.required]],
            Titulo: [this.tasklist.Titulo, [Validators.required]],
        });
    }
}
