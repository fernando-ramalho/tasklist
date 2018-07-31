import { Injectable } from '@angular/core';
import { BaseService, IBaseService, HttpService } from './../services/http.service';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TaskListService extends BaseService implements IBaseService {

    constructor(public http: HttpService) {
        super(http, '/tasklist');
    }
}
