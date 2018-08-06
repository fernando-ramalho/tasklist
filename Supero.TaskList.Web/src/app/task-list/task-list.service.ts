import { Injectable } from '@angular/core';
import { BaseService, IBaseService, HttpService } from './../services/http.service';
import { TaskListModel, TaskListItemModel } from "./../models/TaskListModel";
import { Observable, Subject } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { of, from, throwError } from 'rxjs';

@Injectable()
export class TaskListService extends BaseService implements IBaseService {
    idUsuario = "auth0|5b5e826e77737b5f5c560383";

    constructor(public http: HttpService) {
        super(http, '/tasklist');
    }

    public GetById(Id: number, url?: string): Observable<TaskListModel> {
        let result = super.GetById(Id, url)
            .pipe(map((source: TaskListModel) => {
                return this.mapTaskList(source);
            }));

        return result;
    }

    public Save(tasklist: TaskListModel, url?: string): Observable<TaskListModel> {
        let result = super.Save(tasklist, url);
        return result;
    }

    public DeleteTask(tasklist: TaskListModel, url?: string): Observable<TaskListModel> {
        let result = super.Delete(tasklist.Id, url)
            .pipe(map((source: TaskListModel) => {
                return this.mapTaskList(source);
            }));

        return result;
    }

    public GetTask(idUsuario: string): Observable<TaskListModel[]> {
        return super.GetAll(`/tasklist/GetTask/${idUsuario}`);
    }

    private mapTaskList(source: TaskListModel) {

        let target = new TaskListModel();
        target.Id = source.Id;
        target.DataAlteracao = source.DataAlteracao;
        target.DataConclusao = source.DataConclusao;
        target.DataCriacao = source.DataCriacao; 
        target.DataExclusao = source.DataExclusao;
        target.Descricao = source.Descricao;
        target.IdUsuario = source.IdUsuario;
        target.Itens = source.Itens;
        target.Status = source.Status;
        target.StatusTaskList = source.StatusTaskList;
        target.Titulo = source.Titulo;
          
        return target;
    }
}
