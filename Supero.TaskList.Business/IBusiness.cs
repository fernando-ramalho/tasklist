using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Supero.TaskList.Business
{
    public interface IBusiness<TEntity>
    {
        bool Delete(TEntity entity);
        bool Delete(long id);
        IQueryable<TEntity> GetAll();
        TEntity GetByID(long id);
        IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate);
        bool Insert(TEntity entity);
        bool Update(TEntity entity);
    }
}
