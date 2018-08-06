import { HttpParams, HttpHeaders} from '@angular/common/http';

export class RequestOptionsArgs {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: "response";
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
}