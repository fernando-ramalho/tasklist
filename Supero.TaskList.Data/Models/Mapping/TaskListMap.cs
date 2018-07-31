using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Supero.TaskList.Data.Models.Mapping
{
    public class TaskListMap : EntityTypeConfiguration<TaskList>
    {
        public TaskListMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.IdUsuario)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Titulo)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Descricao)
                .IsRequired()
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("TaskList");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.IdUsuario).HasColumnName("IdUsuario");
            this.Property(t => t.Titulo).HasColumnName("Titulo");
            this.Property(t => t.Descricao).HasColumnName("Descricao");
            this.Property(t => t.IdStatus).HasColumnName("IdStatus");
            this.Property(t => t.DataCricao).HasColumnName("DataCricao");
            this.Property(t => t.DataAlteracao).HasColumnName("DataAlteracao");
            this.Property(t => t.DataExclusao).HasColumnName("DataExclusao");
            this.Property(t => t.DataConclusao).HasColumnName("DataConclusao");
        }
    }
}
