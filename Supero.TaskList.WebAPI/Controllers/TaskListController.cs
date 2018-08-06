using Supero.TaskList.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entity = Supero.TaskList.Data.Models;

namespace Supero.TaskList.WebAPI
{
    [RoutePrefix("api/tasklist")]
    public class TaskListController : BaseApiController
    {        

        // GET: api/TaskList/5
        public TaskListModel Get(int id)
        {
            var taskList = new TaskListBusiness().GetByID(id);
            if (taskList == null)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Tarefa Id={id} não encontrada."));
            }
            return mapper.Map<TaskListModel>(taskList);
        }

        [Route("GetTask/{idUsuario}")]
        [HttpGet]
        public IList<TaskListModel> GetTask(string idUsuario)
        {
            var taskList = new TaskListBusiness().GetWhere(e => e.IdUsuario == idUsuario);
            //var taskList = new TaskListBusiness().GetAll();

            if (taskList == null)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Erro ao consultar tarefas."));
            }
            return mapper.Map<IList<TaskListModel>>(taskList);
        }

        public TaskListModel Post([FromBody]TaskListModel taskListModel)
        {
            var business = new TaskListBusiness();
            var taskList = mapper.Map<Entity.TaskList>(taskListModel);
            taskList.DataCriacao = DateTime.Now;
            taskList.DataAlteracao = null;
            taskList.DataExclusao = null;
            taskList.DataConclusao = null;
            taskList.IdStatus = (int)TaskListEnumModel.StatusTaskList.Pendente;

            var result = business.Insert(taskList);
            if (!result)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Erro ao incluir tarefa."));
            }
            return mapper.Map<TaskListModel>(taskList);
        }

        public TaskListModel Put(int id, [FromBody]TaskListModel taskListModel)
        {
            var business = new TaskListBusiness();

            var entity = business.GetByID(id);
            if (entity == null)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Tarefa Id={id} não encontrada."));
            }

            var taskList = mapper.Map<Entity.TaskList>(taskListModel);
            taskList.DataAlteracao = DateTime.Now;
            
            var result = business.Update(entity, taskList);
            if (!result)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Erro ao incluir tarefa."));
            }

            return mapper.Map<TaskListModel>(taskList);
        }

        public bool Delete(int id)
        {
            var business = new TaskListBusiness();
            var entity = business.GetByID(id);
            if (entity == null)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Tarefa Id={id} não encontrada."));
            }

            entity.DataExclusao = DateTime.Now;
            entity.IdStatus = (int)TaskListEnumModel.StatusTaskList.Cancelada;
            business.Update(entity);
            return true;
        }

    }
}
