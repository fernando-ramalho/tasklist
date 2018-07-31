using Supero.TaskList.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Supero.TaskList.WebAPI
{
    [RoutePrefix("api/tasklist")]
    public class TaskListController : BaseApiController
    {        

        // GET: api/Cliente/5
        public TaskListModel Get(int id)
        {
            var taskList = new TaskListBusiness().GetByID(id);
            if (taskList == null)
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, $"Tarefa Id={id} não encontrada."));
            }
            return mapper.Map<TaskListModel>(taskList);
        }

        [HttpGet]
        [Route("public")]
        public IHttpActionResult Public()
        {
            return Json(new
            {
                message = "Hello from a public endpoint! You don't need to be authenticated to see this."
            });
        }
    }
}
