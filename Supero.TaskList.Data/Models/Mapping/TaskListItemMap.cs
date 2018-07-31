using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Supero.TaskList.Data.Models.Mapping
{
    public class TaskListItemMap : EntityTypeConfiguration<TaskListItem>
    {
        public TaskListItemMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Descricao)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("TaskListItem");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.IdTaskList).HasColumnName("IdTaskList");
            this.Property(t => t.Descricao).HasColumnName("Descricao");

            // Relationships
            this.HasRequired(t => t.TaskList)
                .WithMany(t => t.TaskListItems)
                .HasForeignKey(d => d.IdTaskList);

        }
    }
}
