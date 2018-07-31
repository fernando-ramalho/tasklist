using AutoMapper;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Supero.TaskList.WebAPI
{
    [Authorize]
    public class BaseApiController : System.Web.Http.ApiController
    {
        #region Attributes & Properties
        protected static readonly IMapper mapper = new Mapper(new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<TaskListProfile>();
        }));

        protected ILog Logger { get; private set; }

        #endregion

        #region Constructor

        public BaseApiController()
        {
            Logger = LogManager.GetLogger(GetType());
        }
        #endregion
    }
}
