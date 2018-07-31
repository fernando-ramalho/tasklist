import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, XHRBackend, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Rx';
import { ErrorMessage } from "../models/error-message";

//@Injectable({
//  providedIn: 'root'
//})

@Injectable()
export class HttpService extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        try {
            return super.get(url, reqOptions);
        } catch (error) {
            //console.log(error);
        }
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.post(url, body, reqOptions);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.put(url, body, reqOptions);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let reqOptions = this.getRequestOptionArgs(options);
        url = this.updateUrl(url, reqOptions);
        return super.delete(url, reqOptions);
    }

    private updateUrl(req: string, options: RequestOptionsArgs) {
        let contentType = options.headers.get('Content-Type');
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
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
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
        return this.http.get(url || this.url, options).map(this.extractData)
            .catch(error => handleError(error));
    }

    ListAll(url?: string, options?: RequestOptionsArgs): Promise<any> {
        return this.http.get(url || this.url, options).map(this.extractData)
            .catch(error => handleError(error)).toPromise();
    }

    GetById(id: number, url?: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.get(`${url || this.url}/${id}`, options)
            .map(this.extractData)
            .catch(error => handleError(error));
    }

    GetByParams(params: string, url?: string): Observable<any> {
        return this.http.get(`${url || this.url}/${params}`).map(data => <any>data.json())
            .catch(error => handleError(error));
    }

    Save(entity: any, url?: string): Observable<any> {
        if (entity.Id == null || entity.Id == undefined || entity.Id == 0) {
            return this.http.post(url || this.url, entity).map(data => <any>data.json())
                .catch(error => handleError(error));
        } else {
            return this.http.put(`${url || this.url}/${entity.Id}`, entity).map(data => <any>data.json())
                .catch(error => handleError(error));
        }
    }

    Update(entity: any, url?: string): Observable<any> {
        return this.http.put(`${url || this.url}`, entity).map(data => <any>data.json())
            .catch(error => handleError(error));
    }

    Delete(id: number, url?: string): Observable<any> {
        return this.http
            .delete(`${url || this.url}/${id}`)
            .map(data => <any>data.json())
            .catch(error => handleError(error));
    }

    GetByFilter(params: string, url?: string): Observable<any> {
        return this.http.get(`${url || this.url}?${params}`).map(data => <any>data.json())
            .catch(error => handleError(error));
    }

    ListByFilter(params: string, url?: string): Promise<any> {
        return this.http.get(`${url || this.url}?${params}`).map(data => <any>data.json())
            .catch(error => handleError(error)).toPromise();
    }

    Upload(content: any, url?: string): Observable<any> {
        let options = new RequestOptions();
        options.headers = new Headers();
        return this.http.post(`${url || this.url}`, content, options)
            .map(data => <any>data.json())
            .catch(error => handleError(error));
    }

    private extractData(res: Response) {
        let body: any = "";
        if (res.headers && res.headers.get('Content-Type').indexOf('text/html') < 0)
            body = res.json();
        else
            body = res.text();
        return body;
    }
}


export function handleError(error: Response | any) {
    let customError = new ErrorMessage();

    if (error instanceof Response) {
        customError.StatusCode = error.status;

        try {
            customError.Message = error.json().Message;
        } catch (error) {
            customError.Message = JSON.stringify(error.json());
        }

        if (!customError.Message)
            customError.Message = `Erro ao realizar a operação.`;

        try {
            customError.MessageDetail = error.json().MessageDetail;
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

    return Observable.throw(customError);
}