
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Entity = Supero.TaskList.Data.Models;
using Supero.TaskList.Data;

namespace Supero.TaskList.Business
{
    public class TaskListItemBusiness : BaseBusiness<TaskListItemRepository, Entity.TaskListItem>
    {
        #region Constructor

        public TaskListItemBusiness()
        {
        }
        #endregion

        #region Attributes & Properties

        #endregion
    }
}