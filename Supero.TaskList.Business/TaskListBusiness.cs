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

        #region Method
        public bool Update(Entity.TaskList entityOriginal, Entity.TaskList entityChanged)
        {
            try
            {
                entityOriginal.DataAlteracao = entityChanged.DataAlteracao;
                entityOriginal.Descricao = entityChanged.Descricao;
                entityOriginal.IdStatus = entityChanged.IdStatus;

                this.RepositoryInstance.Update(entityOriginal);
                this.RepositoryInstance.Commit();
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"Erro ao atualizar", ex);
                return false;
            }

        }
        #endregion
    }
}
