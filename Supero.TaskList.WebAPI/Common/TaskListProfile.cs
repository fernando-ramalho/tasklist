using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Entity = Supero.TaskList.Data.Models;

namespace Supero.TaskList.WebAPI
{
    public class TaskListProfile : Profile
    {
        public TaskListProfile()
        {
            //Todas as strings nulas serão mapeadas para vazias.
            CreateMap<string, string>().ConvertUsing(s => s ?? string.Empty);

            CreateMap<Entity.TaskList, TaskListModel>()
                .ForMember(target => target.Itens, member => member.MapFrom(source => source.TaskListItems))
                .ForMember(target => target.StatusTaskList, member => member.MapFrom(source => (TaskListEnumModel.StatusTaskList)source.IdStatus)); ;

            CreateMap<TaskListItemModel, Entity.TaskListItem>().ForMember(target => target.TaskList, member => member.Ignore());
        }  
    }
}