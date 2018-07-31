using System;
using System.Collections.Generic;

namespace Supero.TaskList.Data.Models
{
    public partial class TaskListItem : IEntity
    {
        public int Id { get; set; }
        public int IdTaskList { get; set; }
        public string Descricao { get; set; }
        public virtual TaskList TaskList { get; set; }
    }
}
