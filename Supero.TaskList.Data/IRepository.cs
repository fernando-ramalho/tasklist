using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Supero.TaskList.Data
{
    public interface IRepository
    {
    }

    public interface IRepository<TEntity> : IRepository, IDisposable where TEntity : class
    {
        #region Search
        IQueryable<TEntity> GetAll();
        IQueryable<TEntity> GetWhere(Expression<Func<TEntity, Boolean>> predicate);
        TEntity GetByID(Int64 id);
        #endregion

        #region Persistence
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(Int64 id);
        void Commit();
        #endregion
    }
}
