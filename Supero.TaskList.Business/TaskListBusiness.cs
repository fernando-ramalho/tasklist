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
    public class TaskListBusiness : BaseBusiness<TaskListRepository , Entity.TaskList>
    {
        #region Constructor

        public TaskListBusiness()
        {
        }
        #endregion

        #region Attributes & Properties

        #endregion
    }
}
