using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Supero.TaskList.WebAPI
{
    public class TaskListEnumModel
    {        
        
        /// <summary>
        /// Status da Lista de Tarefas
        /// </summary>
        public enum StatusTaskList
        {
            Ativa = 0,
            Pendente = 1,
            Cancelada = 2,
            Concluida = 3,
        }
    }
}