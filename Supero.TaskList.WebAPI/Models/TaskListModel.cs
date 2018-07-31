using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supero.TaskList.WebAPI
{
    public class TaskListModel
    {
        /// <summary>
        /// Identificador único da lista de tarefas
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador único do usuário
        /// </summary>
        public string IdUsuario { get; set; }

        /// <summary>
        /// Titulo da lista de tarefas
        /// </summary>
        public string Titulo { get; set; }

        /// <summary>
        /// Descricao da lista de tarefa
        /// </summary> 
        public string Descricao { get; set; }

        /// <summary>
        /// Status da lista de tarefa
        /// </summary>
        public TaskListEnumModel.StatusTaskList StatusTaskList { get; set; }

        /// <summary>
        /// Data de criação
        /// </summary>
        public DateTime DataCriacao { get; set; }

        /// <summary>
        /// Data de alteração
        /// </summary>
        public DateTime DataAlteracao { get; set; }

        /// <summary>
        /// Data de exclusão
        /// </summary>
        public DateTime DataExclusao { get; set; }

        /// <summary>
        /// Data de conclusão
        /// </summary>
        public DateTime DataConclusao { get; set; }

        /// <summary>
        /// Itens relacionados
        /// </summary>
        public IList<TaskListItemModel> Itens { get; set; }
    }
}