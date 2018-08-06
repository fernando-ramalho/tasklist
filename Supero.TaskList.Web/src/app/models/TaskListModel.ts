export class TaskListModel {
    public Id?: number;
    public IdUsuario?: string;
    public Titulo?: string;
    public Descricao?: string;
    public StatusTaskList?: number;
    public DataCriacao?: Date = null;
    public DataAlteracao?: Date = null;
    public DataExclusao?: Date = null;
    public DataConclusao?: Date = null;
    public Itens?: TaskListItemModel[];
    public Status?: StatusTaskListEnum;

    //constructor(public Id?: number,
    //    public IdUsuario?: string,
    //    public Titulo?: string,
    //    public Descricao?: string,
    //    public StatusTaskList?: number,
    //    public DataCriacao?: Date,
    //    public DataAlteracao?: Date,
    //    public DataExclusao?: Date,
    //    public DataConclusao?: Date,
    //    public Itens?: TaskListItemModel[],
    //    public Status?: StatusTaskListEnum) { }
}

export class TaskListItemModel {
    constructor(public Id?: number,
        public Descricao?: string,
        public IdTaskList?: number,
    ) { }
}

export enum StatusTaskListEnum {
    Ativa = 0,
    Pendente = 1,
    Cancelada = 2,
    Concluida = 3
}