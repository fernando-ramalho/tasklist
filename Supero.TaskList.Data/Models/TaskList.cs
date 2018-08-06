using System;
using System.Collections.Generic;

namespace Supero.TaskList.Data.Models
{
    public partial class TaskList : IEntity
    {
        public TaskList()
        {
            this.TaskListItems = new List<TaskListItem>();
        }

        public int Id { get; set; }
        public string IdUsuario { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public byte IdStatus { get; set; }
        public System.DateTime DataCriacao { get; set; }
        public Nullable<System.DateTime> DataAlteracao { get; set; }
        public Nullable<System.DateTime> DataExclusao { get; set; }
        public Nullable<System.DateTime> DataConclusao { get; set; }
        public virtual ICollection<TaskListItem> TaskListItems { get; set; }
    }
}
