import { Injectable } from '@angular/core';
import { HttpService, IBaseService, BaseService } from "./../services/http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PingService extends BaseService implements IBaseService {

    constructor(public http: HttpService) {
        super(http, "/ping");
    }

}
