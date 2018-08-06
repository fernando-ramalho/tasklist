import { Injectable } from "@angular/core";
//import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, XHRBackend, Headers } from "@angular/http";
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders, HttpResponseBase, HttpResponse, HttpRequest } from '@angular/common/http';
import { RequestOptionsArgs } from './RequestOptionsArgs';
import { environment } from "../../environments/environment";
//import { Observable } from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';

import { map, take, catchError } from 'rxjs/operators';
import { of, from, throwError } from 'rxjs';
import { ErrorMessage } from "../models/error-message";

@Injectable({ providedIn: 'root' })
export class HttpService extends HttpClient {
    constructor(handler: HttpHandler) {
        super(handler);
    }


    _get(url: string, options?: RequestOptionsArgs): Observable<HttpResponse<Object>> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        try {
            return super.get(url, reqOptions);
        } catch (error) {
            //console.log(error);
        }
    }

    _post(url: string, body: any, options?: RequestOptionsArgs): Observable<HttpResponse<Object>> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.post(url, body, reqOptions);
    }

    _put(url: string, body: any, options?: RequestOptionsArgs): Observable<HttpResponse<Object>> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.put(url, body, reqOptions);
    }

    _delete(url: string, options?: RequestOptionsArgs): Observable<HttpResponse<Object>> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.delete(url, reqOptions);
    }

    private updateUrl(req: string, options: RequestOptionsArgs) {
        let contentType = (<HttpHeaders>options.headers).get('Content-Type');
        let partialPath = "/api";

        if (contentType && (contentType.indexOf('text/plain') >= 0 || contentType.indexOf('text/html') >= 0)) {
            partialPath = "/page";
        }

        // definindo token;
        this.defineToken(options);

        return environment.API_URL + partialPath + req;
    }

    private defineToken(options) {
        let token = localStorage.getItem('access_token');
        if (token) {
            options.headers.append('Authorization', 'Bearer ' + token);
        }
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptionsArgs();
            options.observe = 'response';
        }

        if (options.headers == null) {
            options.headers = new HttpHeaders();
            //options.headers.append('Content-Type', 'application/json');
        }

        return options;
    }
}

export interface IBaseService {
    GetAll(): Observable<any>;
    GetById(id: number): Observable<any>;
    Save(entity: any): Observable<any>;
    Delete(id: number): Observable<any>;
    GetByFilter(params: string): Observable<any>;
    Upload(content: any): Observable<any>;
}

export class BaseService {

    constructor(public http: HttpService, protected url: string) {

    }

    GetAll(url?: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http._get(url || this.url, options).pipe(map(this.extractData), catchError(error => handleError(error)));
    }

    ListAll(url?: string, options?: RequestOptionsArgs): Promise<any> {
        return this.http._get(url || this.url, options).pipe(map(this.extractData), catchError(error => handleError(error))).toPromise();
    }

    GetById(id: number, url?: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http._get(`${url || this.url}/${id}`, options)
            .pipe(map(this.extractData), catchError(error => handleError(error)));
    }

    GetByParams(params: string, url?: string): Observable<any> {
        return this.http._get(`${url || this.url}/${params}`).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    Save(entity: any, url?: string): Observable<any> {
        if (entity.Id == null || entity.Id == undefined || entity.Id == 0) {
            return this.http._post(url || this.url, entity).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
        } else {
            return this.http._put(`${url || this.url}/${entity.Id}`, entity).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
        }
    }

    Insert(entity: any, url?: string): Observable<any> {
        return this.http._post(`${url || this.url}`, entity).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    Update(entity: any, url?: string): Observable<any> {
        return this.http._put(`${url || this.url}/${entity.Id}`, entity).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    Delete(id: number, url?: string): Observable<any> {
        return this.http._delete(`${url || this.url}/${id}`).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    GetByFilter(params: string, url?: string): Observable<any> {
        return this.http._get(`${url || this.url}?${params}`).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    ListByFilter(params: string, url?: string): Promise<any> {
        return this.http._get(`${url || this.url}?${params}`).pipe(map(data => <any>data.body), catchError(error => handleError(error))).toPromise();
    }

    Upload(content: any, url?: string): Observable<any> {
        let options = new RequestOptionsArgs();
        options.headers = new HttpHeaders();
        return this.http._post(`${url || this.url}`, content, options).pipe(map(data => <any>data.body), catchError(error => handleError(error)));
    }

    private extractData(res: any) {
        let body: any = "";
        let resp = res as HttpResponse<any>;
        if (resp.headers && resp.headers.get('Content-Type').indexOf('text/html') < 0)
            body = resp.body;

        return body;
    }
}

interface IMessageResponse {
    message: string;
}

interface IMessageDetailResponse {
    MessageDetail: string;
}
export function handleError(error: HttpErrorResponse | any) {
    let customError = new ErrorMessage();

    if (error.error instanceof ErrorEvent) {
        customError.StatusCode = error.status;

        try {
            customError.Message = (error.error as IMessageResponse).message;
        } catch (error) {
            customError.Message = JSON.stringify(error);
        }

        if (!customError.Message)
            customError.Message = `Erro ao realizar a operação.`;

        try {
            customError.MessageDetail = JSON.stringify(error);
        } catch (error) {
            customError.MessageDetail = 'Detalhe indisponível';
        }

        if (!customError.MessageDetail) {
            if (error.statusText && error.url)
                customError.MessageDetail += ` ${error.statusText} - Url: ${error.url.replace(environment.API_URL, '')}`;
        }

    } else {
        customError.StatusCode = 500;
        customError.Message = "Erro geral ";
        customError.MessageDetail = JSON.stringify(error);
    }

    if (customError.StatusCode == 401 || customError.StatusCode == 403) {
        customError.Message = "Autorização foi negada para esta requisição.";
        customError.RedirectUrl = "/";
    }

    return throwError(customError);
}