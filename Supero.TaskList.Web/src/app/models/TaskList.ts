export class TaskList {
    constructor(public Id?: number,
        public IdUsuario?: number,
        public Titulo?: string,
        public Descricao?: string,
        public StatusTaskList?: number,
        public DataCriacao?: Date ,
        public DataAlteracao?: Date  ,
        public DataExclusao?: Date  ,
        public DataConclusao?: Date,
        public Itens?: TaskListItem[],
        public Status?: StatusTaskListEnum) { }
}

export class TaskListItem {
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