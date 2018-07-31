using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Supero.TaskList.Data.Models.Mapping;

namespace Supero.TaskList.Data.Models
{
    public partial class SuperoTaskListContext : DbContext
    {
        static SuperoTaskListContext()
        {
            Database.SetInitializer<SuperoTaskListContext>(null);
        }

        public SuperoTaskListContext()
            : base("Name=SuperoTaskListContext")
        {
        }

        public DbSet<TaskList> TaskLists { get; set; }
        public DbSet<TaskListItem> TaskListItems { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new TaskListMap());
            modelBuilder.Configurations.Add(new TaskListItemMap());
        }
    }
}
