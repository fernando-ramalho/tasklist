using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supero.TaskList.WebAPI
{
    public class TaskListItemModel
    {
        /// <summary>
        /// Identificador único do item lista de tarefas
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Identificador único do lista de tarefas
        /// </summary>
        public int IdTaskList { get; set; }

        /// <summary>
        /// Descricao do item da lista de tarefa
        /// </summary>
        public string Descricao { get; set; }
    }
}